import React, { useState, useEffect, useReducer } from 'react';
import { collection, onSnapshot, getDoc, DocumentReference, doc } from 'firebase/firestore';
import db from '../services/Firestore';
import { useSelectedMembers } from '../Context/membersContext';
import { useNarrowContext } from '../Context/NarrowedContext';
import { useOrganizationContext } from '../Context/organizationContext';

interface Team {
  id: string;
  name: string;
  date_established: {
    seconds: number;
    nanoseconds: number;
  };
  color?: string;
  status: 'active' | 'suspended';
  members: DocumentReference[];
  timestamp: number; // Add timestamp for caching
  organization?: string;
  

}
interface OrganizationDocument {
  name: string;
  // Add other fields if necessary
}

interface TeamListProps {
  displayIconsOnly?: boolean; // Boolean prop to control the display of icons only
}

// Define action types
type ActionType =
  | { type: 'SET_ACTIVE_TEAMS'; payload: Team[] }
  | { type: 'SET_SUSPENDED_TEAMS'; payload: Team[] };

// Define reducer function
const teamsReducer = (
  state: { activeTeams: Team[]; suspendedTeams: Team[] },
  action: ActionType
): { activeTeams: Team[]; suspendedTeams: Team[] } => {
  switch (action.type) {
    case 'SET_ACTIVE_TEAMS':
      return { ...state, activeTeams: action.payload };
    case 'SET_SUSPENDED_TEAMS':
      return { ...state, suspendedTeams: action.payload };
    default:
      return state;
  }
};

const TeamList: React.FC<TeamListProps> = ({ displayIconsOnly = false }) => {

  const { enteredOrganization } = useOrganizationContext();

  const { isNarrowed1, toggleIsNarrowed1 } = useNarrowContext();
  const { selectedMembers, dispatch } = useSelectedMembers();

  const [{ activeTeams, suspendedTeams }, teamsDispatch] = useReducer(teamsReducer, {
    activeTeams: [],
    suspendedTeams: [],
  });

 // ...
 useEffect(() => {
  const fetchData = async () => {
    const unsubscribe = onSnapshot(collection(db, 'Teams'), async (snapshot) => {
      const activeTeamsData: Team[] = [];
      const suspendedTeamsData: Team[] = [];

      for (const doc of snapshot.docs) {
        const { name, date_established, color, status, members, organization } = doc.data();

        const teamData: Team = {
          id: doc.id,
          name,
          date_established,
          color,
          status,
          members,
          organization,
          timestamp: Date.now(),
        };

        try {
          // Fetch the organization document using the reference
          const orgDoc = await getDoc(organization);

          if (orgDoc.exists()) {
            const orgData = orgDoc.data() as OrganizationDocument;

            // Compare the organization name with the entered organization
            if (orgData.name === enteredOrganization) {
              if (status === 'active') {
                activeTeamsData.push(teamData);
              } else if (status === 'suspended') {
                suspendedTeamsData.push(teamData);
              }
            }
          } else {
            console.error(`Organization document not found for team ${teamData.name}`);
          }
        } catch (error) {
          console.error('Error fetching organization document:', error);
        }
      }

      teamsDispatch({ type: 'SET_ACTIVE_TEAMS', payload: activeTeamsData });
      teamsDispatch({ type: 'SET_SUSPENDED_TEAMS', payload: suspendedTeamsData });
      localStorage.setItem('activeTeams', JSON.stringify(activeTeamsData));
      localStorage.setItem('suspendedTeams', JSON.stringify(suspendedTeamsData));
    });

    return () => unsubscribe();
  };

  fetchData();
}, [enteredOrganization]);

// ...
  const handleTeamNameClick = async (members: DocumentReference[]) => {
    console.log('Members value:', members);

    try {
      const userNames: string[] = [];
      let teamDateCreated: Date | undefined;

      // Assuming members is an array of DocumentReference
      for (const memberRef of members) {
        const userId = memberRef.id; // Extract user ID from the reference
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          const { name } = userDoc.data() as { name: string };
          userNames.push(name);
        }
      }

      // Fetch the dateCreated field from the first member's team document
      if (members.length > 0) {
        const teamDoc = await getDoc(members[0]); // Assuming the team document is stored in the first member's reference
        if (teamDoc.exists()) {
          const { dateCreated } = teamDoc.data() as { dateCreated: { seconds: number; nanoseconds: number } };
          teamDateCreated = new Date(dateCreated.seconds * 1000); // Convert timestamp to Date
        }
      }

      if (userNames.length > 0) {
        if (isNarrowed1) {
          toggleIsNarrowed1();
        }

        // Save selectedMembers and teamDateCreated to sessionStorage
        sessionStorage.setItem('selectedMembers', JSON.stringify(userNames));
        sessionStorage.setItem('teamDateCreated', JSON.stringify(teamDateCreated));

        dispatch({
          type: 'SET_SELECTED_MEMBERS',
          payload: `${userNames.join(', ')} (${teamDateCreated?.toLocaleDateString()})`,
        });
      } else {
        console.error('No valid user document found for the given references.');
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
    }
  };

  return (
    <div className='bottom-24 -left-8 absolute font-mono '>
      {!displayIconsOnly && <h2 className="font-bold">Active Teams</h2>}
      <ul>
        {activeTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2 cursor-pointer ">
            {displayIconsOnly ? (
              <div
                className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center `}
                style={{
                  backgroundColor: team.color || 'brown',
                  color: 'white',
                }}
              >
                {team.name.charAt(0)}
              </div>
            ) : (
              <>
                <div
                  className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                  style={{
                    backgroundColor: team.color || 'brown',
                    color: 'white',
                  }}
                >
                  {team.name.charAt(0)}
                </div>
                <div className="font-semibold">
                  <div onClick={() => handleTeamNameClick(team.members)}>
                    <div className="text-sm font-bold  text-primary-text">{team.name}</div>
                    <div className="text-xs text-secondary-text">{team.date_established?.seconds && new Date(team.date_established.seconds * 1000).toLocaleDateString()}</div>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {!displayIconsOnly && <h2 className="font-bold mt-4">Suspended Teams</h2>}
      <ul>
        {suspendedTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2 cursor-pointer">
            {displayIconsOnly ? (
              <div
                className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                style={{
                  backgroundColor: team.color || 'brown',
                  color: 'white',
                }}
              >
                {team.name.charAt(0)}
              </div>
            ) : (
              <>
                <div
                  className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
                  style={{
                    backgroundColor: team.color || 'brown',
                    color: 'white',
                  }}
                >
                  {team.name.charAt(0)}
                </div>
                <div className="font-semibold">
                  <div onClick={() => handleTeamNameClick(team.members)}>
                    <div className="text-sm font-bold text-primary-text">{team.name}</div>
                    <div className="text-xs text-secondary-text">
                      {team.date_established?.seconds && new Date(team.date_established.seconds * 1000).toLocaleDateString()}
                    </div>
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
