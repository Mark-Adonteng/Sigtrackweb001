// src/components/TeamList.tsx

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../constants/services/Firestore'; // Adjust the path based on your project structure

interface Team {
  id: string;
  name: string;
  date_established: string;
  iconColor?: string;
  status: 'Active' | 'Suspended';
}

const TeamList: React.FC = () => {
  const [activeTeams, setActiveTeams] = useState<Team[]>([]);
  const [suspendedTeams, setSuspendedTeams] = useState<Team[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Teams'), (snapshot) => {
      const activeTeamsData: Team[] = [];
      const suspendedTeamsData: Team[] = [];

      snapshot.forEach((doc) => {
        const { name, date_established, iconColor, status } = doc.data();

        const teamData = { id: doc.id, name, date_established, iconColor, status };

        if (status === 'Active') {
          activeTeamsData.push(teamData);
        } else if (status === 'Suspended') {
          suspendedTeamsData.push(teamData);
        }
      });

      setActiveTeams(activeTeamsData);
      setSuspendedTeams(suspendedTeamsData);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className='font-bold'>Active Teams</h2>
      <ul>
        {activeTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2">
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
              <div className='text-sm text-bold text-primary-text'>{team.name}</div>
              <div className='text-xs text-secondary-text'>{team.date_established}</div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className='font-bold mt-4'>Suspended Teams</h2>
      <ul>
        {suspendedTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2">
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
              <div className='text-sm text-bold text-primary-text'>{team.name}</div>
              <div className='text-xs text-secondary-text'>{team.date_established}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
