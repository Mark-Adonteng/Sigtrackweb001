import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useTeamMembersContext } from '../Context/TeamMembersContext';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { MemberData } from '../Context/TeamMembersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const containerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: '5vw',
  width: 'calc(120.5vw - 400px)',
  height: '100vh',
};

enum MapType {
  ROADMAP = 'roadmap',
  SATELLITE = 'satellite',
  HYBRID = 'hybrid',
  TERRAIN = 'terrain',
}

const GoogleMapComponent: React.FC = () => {
  const [mapType, setMapType] = useState<MapType>(MapType.ROADMAP);
  const { teamMembers } = useTeamMembersContext();
  const [userMarkers, setUserMarkers] = useState<
    { userId: string; position: { lat: number; lng: number }; memberData: MemberData }[]
  >([]);
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchUserMarkers = async () => {
      const markers = await Promise.all(
        teamMembers.map(async (member) => {
          try {
            const userDoc = await getDoc(doc(db, 'users', member.userId));

            if (userDoc.exists()) {
              const userData = userDoc.data();
              if (userData && userData.latitude && userData.longitude) {
                return {
                  userId: member.userId,
                  position: { lat: userData.latitude, lng: userData.longitude },
                  memberData: member,
                };
              }
            }
          } catch (error) {
            console.error(`Error fetching user data for userId: ${member.userId}`, error);
          }
          return null;
        })
      );

      setUserMarkers(markers.filter((marker) => marker !== null) as any);
    };

    fetchUserMarkers();

    // Fetch current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }, [teamMembers]);

  const handleMarkerClick = (member: MemberData) => {
    setSelectedMember(member);
  };

  const center = currentLocation || {
    lat: 5.5871,
    lng: -0.2774,
  };


  const handleGoToCurrentLocation = () => {
    if (currentLocation && mapRef.current) {
      // Set the map center to the current location using the mapRef
      mapRef.current.panTo(currentLocation);
    }
  };

  const mapRef = React.useRef<google.maps.Map | null>(null);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDkw3a_XLgmpbUFB1yuuNj3o5cFlhP7HCo"
    >
         <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '250px',
          zIndex: 0,
        }}
      >
        <select
          id="mapType"
          onChange={(e) => setMapType(e.target.value as MapType)}
          value={mapType}
        >
          {/* ... (dropdown select options) */}
        </select>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        mapTypeId={mapType}
        onLoad={(map) => {
          // Save the reference to the map
          mapRef.current = map;
        }}
      >
        {userMarkers.map((marker) => (
          <Marker
            key={marker.userId}
            position={marker.position}
            onClick={() => handleMarkerClick(marker.memberData)}
          />
        ))}

{currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: 'green',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}

        {selectedMember && (
         <InfoWindow
         position={{
           lat: selectedMember.latitude || center.lat,
           lng: selectedMember.longitude || center.lng,
         }}
         onCloseClick={() => setSelectedMember(null)}
       >
         <div>
           <h3>
            <strong>Name: </strong>{selectedMember.name}</h3>
           <p> <strong>User ID: </strong>{selectedMember.userId}</p>
           <div>
             <strong>Status:</strong> {selectedMember.status}
           </div>
           <div>
             <strong>User Type:</strong> {selectedMember.user_type} 
           </div>
           {/* Add other member details as needed */}
         </div>
       </InfoWindow>
       
        )}
        <div className='bg-white'>
        <div
          onClick={handleGoToCurrentLocation}
          className='fixed p-1 text-green left-96 ml-[1032px] mt-96 top-28 bg-white w-10 text-center pointer '
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
        </div>
        </div>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;