
// TeamList.tsx

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, getDoc, DocumentReference, doc } from 'firebase/firestore';
import db from '../constants/services/Firestore';
import { useSelectedMembers } from '../ContextTheme/membersContext';
import { useNarrowContext } from '../ContextTheme/NarrowedContext';

interface Team {
  id: string;
  name: string;
  date_established: string;
  iconColor?: string;
  status: 'Active' | 'Suspended';
  members: DocumentReference[];
  timestamp: number; // Add timestamp for caching
}

interface TeamListProps {
  displayIconsOnly?: boolean; // Boolean prop to control the display of icons only
}

const TeamList: React.FC<TeamListProps> = ({ displayIconsOnly = false }) => {
  const { isNarrowed1, toggleIsNarrowed1 } = useNarrowContext();
  const { setSelectedMembers } = useSelectedMembers();

  const [activeTeams, setActiveTeams] = useState<Team[]>([]);
  const [suspendedTeams, setSuspendedTeams] = useState<Team[]>([]);

  useEffect(() => {
    const loadedActiveTeams = localStorage.getItem('activeTeams');
    const loadedSuspendedTeams = localStorage.getItem('suspendedTeams');

    if (loadedActiveTeams) {
      setActiveTeams(JSON.parse(loadedActiveTeams));
    }

    if (loadedSuspendedTeams) {
      setSuspendedTeams(JSON.parse(loadedSuspendedTeams));
    }

    const unsubscribe = onSnapshot(collection(db, 'Teams'), (snapshot) => {
      const activeTeamsData: Team[] = [];
      const suspendedTeamsData: Team[] = [];

      snapshot.forEach((doc) => {
        const { name, date_established, iconColor, status, members } = doc.data();

        const teamData = { id: doc.id, name, date_established, iconColor, status, members, timestamp: Date.now() };

        if (status === 'Active') {
          activeTeamsData.push(teamData);
        } else if (status === 'Suspended') {
          suspendedTeamsData.push(teamData);
        }
      });

      setActiveTeams(activeTeamsData);
      setSuspendedTeams(suspendedTeamsData);
      localStorage.setItem('activeTeams', JSON.stringify(activeTeamsData));
      localStorage.setItem('suspendedTeams', JSON.stringify(suspendedTeamsData));
    });

    return () => unsubscribe();
  }, []);

  // Event handler for clicking a team name
  const handleTeamNameClick = async (members: DocumentReference[]) => {
    console.log('Members value:', members);

    try {
      const userInfos: { name: string; dateCreated: string }[] = [];

      // Assuming members is an array of DocumentReference
      for (const memberRef of members) {
        const userId = memberRef.id; // Extract user ID from the reference
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          const { name, dateCreated } = userDoc.data();
          userInfos.push({ name, dateCreated });
        }
      }

      if (userInfos.length > 0) {
        if (isNarrowed1) {
          toggleIsNarrowed1();
        }

        const formattedUserInfos = userInfos.map(
          (userInfo) => `${userInfo.name} ${userInfo.dateCreated}`
        );

        // Save selectedMembers to sessionStorage
        sessionStorage.setItem('selectedMembers', JSON.stringify(formattedUserInfos));

        setSelectedMembers(formattedUserInfos.join(', '));
      } else {
        console.error('No valid user document found for the given references.');
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
    }
  };

  return (
    <div>
      {!displayIconsOnly && (
        <h2 className='font-bold'>Active Teams</h2>
      )}
      <ul>
        {activeTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2 cursor-pointer">
            {displayIconsOnly && (
              <div
                className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                style={{
                  backgroundColor: team.iconColor || 'brown',
                  color: 'white',
                }}
              >
                {team.name.charAt(0)}
              </div>
            )}
            {!displayIconsOnly && (
              <>
                <div
                  className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                  style={{
                    backgroundColor: team.iconColor || 'brown',
                    color: 'white',
                  }}
                >
                  {team.name.charAt(0)}
                </div>
                <div className='font-semibold'>
                  <div onClick={() => handleTeamNameClick(team.members)}>
                    <div className='text-sm text-bold text-primary-text'>{team.name}</div>
                    <div className='text-xs text-secondary-text'>{team.date_established}</div>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {!displayIconsOnly && (
        <h2 className='font-bold mt-4'>Suspended Teams</h2>
      )}
      <ul>
        {suspendedTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2 cursor-pointer">
            {displayIconsOnly && (
              <div
                className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                style={{
                  backgroundColor: team.iconColor || 'brown',
                  color: 'white',
                }}
              >
                {team.name.charAt(0)}
              </div>
            )}
            {!displayIconsOnly && (
              <>
                <div
                  className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                  style={{
                    backgroundColor: team.iconColor || 'brown',
                    color: 'white',
                  }}
                >
                  {team.name.charAt(0)}
                </div>
                <div className='font-semibold'>
                  <div onClick={() => handleTeamNameClick(team.members)}>
                    <div className='text-sm text-bold text-primary-text'>{team.name}</div>
                    <div className='text-xs text-secondary-text'>{team.date_established}</div>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
