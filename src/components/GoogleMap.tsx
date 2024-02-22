import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: "5vw",
    width: 'calc(120.5vw - 400px)', // Adjust the width as needed
    height: '100vh',
  };
  const dropdownStyle: React.CSSProperties = {
    // height: '50px', // Adjust the height as needed
    // borderRadius: '10px', // Make edges rounded
    // backgroundColor: '#fff', // Background color
    // padding: '5px', 
    // justifyContent:"center",
    // outline:"none"
  };
  

  const center = {
    lat: 5.5871, // Latitude for Accra, Ghana
    lng: -0.2774, // Longitude for Accra, Ghana
  };

enum MapType {
  ROADMAP = 'roadmap',
  SATELLITE = 'satellite',
  HYBRID = 'hybrid',
  TERRAIN = 'terrain',
}

const GoogleMapComponent: React.FC = () => {
  const [mapType, setMapType] = useState<MapType>(MapType.ROADMAP);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDkw3a_XLgmpbUFB1yuuNj3o5cFlhP7HCo"
    >
           <div style={{ ...dropdownStyle, position: 'absolute', top: '10px', left: '250px', zIndex: 0}}>
    
        <select
          id="mapType"
          onChange={(e) => setMapType(e.target.value as MapType)}
          value={mapType}
          
        >
          <option value={MapType.ROADMAP}>Roadmap</option>
          <option value={MapType.SATELLITE}>Satellite</option>
          <option value={MapType.HYBRID}>Hybrid</option>
          <option value={MapType.TERRAIN}>Terrain</option>
        </select>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        mapTypeId={mapType}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
