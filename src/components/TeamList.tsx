import React, { useState, useEffect, useReducer } from 'react';
import { collection, onSnapshot, getDoc,updateDoc,deleteDoc, DocumentReference, doc,addDoc } from 'firebase/firestore';
import db from '../services/Firestore';
import { useSelectedMembers } from '../Context/membersContext';
import { useNarrowContext } from '../Context/NarrowedContext';
import { useOrganizationContext } from '../Context/organizationContext';
import AddandEditButton from './AddandEditButton';
import AddTeamModal from './AddTeamModal';
import { RiPencilFill, RiDeleteBin6Line } from 'react-icons/ri';
import EditTeamModal from './EditTeamModal';
import { useTeamId } from '../Context/TeamIdContext';
import { useTeamMembersContext } from '../Context/TeamMembersContext';


export interface Team {
  id: string; 
  name: string;
  date_established: {
    seconds: number;
    nanoseconds: number;
  };
  color?: string;
  status: 'active' | 'suspended';
  description:string;
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

interface MemberData {
  name: string;
  dateCreated: string | Date;
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
        const { name, date_established, color, status, members, description, organization } = doc.data();

        const teamData: Team = {
          id: doc.id,
          name,
          date_established,
          color,
          status,
          members,
          organization,
          description,
          timestamp: Date.now(),
        };

        try {
          if (typeof organization === 'string') {
            teamData.organization = organization;

            // Check if the organization is equal to the entered organization
            if (organization === enteredOrganization) {
              if (status === 'active') {
                activeTeamsData.push(teamData);
              } else if (status === 'suspended') {
                suspendedTeamsData.push(teamData);
              }
            }

            console.log(`Organization is a string: ${organization}`);
          } else if (organization instanceof DocumentReference) {
            // If organization is a DocumentReference, fetch the document
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
          } else {
            console.error(`Unknown type for organization: ${organization}`);
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
}, [enteredOrganization, dispatch, teamsDispatch]);


const { setTeamId } = useTeamId();


const { setTeamMembers } = useTeamMembersContext();

const handleTeamNameClick = async (members: DocumentReference[], teamId: string) => {
  try {
    console.log('Clicked Team ID:', teamId); // Log the teamId to the console

    const teamMembersData: { name: string; dateCreated: string | Date }[] = [];
    let teamDateCreated: Date | undefined = new Date(Date.now()); // Initialize with the current date and time

    if (members.length === 0) {
      // If there are no members, set a default message
      // teamMembersData.push({ name: 'No members in this team', dateCreated: '' });
    } else {
      // Assuming members is an array of DocumentReference
      for (const memberRef of members) {
        const userId = memberRef.id; // Extract user ID from the reference
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const memberName = userData?.name || '';

          // Set memberDateCreated to Date.now() for new members
          let memberDateCreated: string | Date = new Date(Date.now());

          if ('dateCreated' in userData && userData.dateCreated !== undefined) {
            const timestamp = userData.dateCreated.seconds * 1000;
            memberDateCreated = new Date(timestamp);
          } else {
            // If dateCreated is already a date, use it directly
            memberDateCreated = userData?.dateCreated || '';
          }

          teamMembersData.push({ name: memberName, dateCreated: memberDateCreated });
        }
      }
    }

    if (isNarrowed1) {
      toggleIsNarrowed1();
    }

    // Set the state to display members below the clicked team
    setTeamMembers(teamMembersData);

    // Save selectedMembers and teamDateCreated to sessionStorage
    sessionStorage.setItem('selectedMembers', JSON.stringify(teamMembersData));
    sessionStorage.setItem('teamDateCreated', JSON.stringify(teamDateCreated));

    dispatch({
      type: 'SET_SELECTED_MEMBERS',
      payload: `${teamMembersData.map((member) => `${member.name} - ${member.dateCreated}`).join(', ')}`,
    });

    setTeamId(teamId);
  } catch (error) {
    console.error('Error fetching user document:', error);
  }
};




const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};


const handleAddButtonClick = () => {
  openModal();
};

const handleSubmitForm = async ({
  newTeamName,
  userEnteredStatus,
  userEnteredColor,
  userEnteredDescription,
}: {
  newTeamName: string;
  userEnteredStatus: string;
  userEnteredColor: string;
  userEnteredDescription: string;
}) => {
  try {
    const newTeamData = {
      name: newTeamName,
      date_established: {
        seconds: Date.now() / 1000,
        nanoseconds: 0,
      },
      status: userEnteredStatus as 'active' | 'suspended',
      members: [],
      organization: enteredOrganization, // Assuming enteredOrganization is defined elsewhere
      color: userEnteredColor || 'brown',
      description: userEnteredDescription || '',
      // Add other fields as needed
    };

    const docRef = await addDoc(collection(db, 'Teams'), newTeamData);

    // Update the document with the ID field
    await updateDoc(docRef, { id: docRef.id });

    console.log('New team added with ID:', docRef.id);
    closeModal(); // Close the modal after successful submission
  } catch (error) {
    console.error('Error adding new team:', error);
  }
};

// const handleEditButtonClick = async (teamId: string) => {
//   // Implement your logic for handling edit action
//   console.log('Edit button clicked for team ID:', teamId);
// };

const handleDeleteButtonClick = async (teamId: string) => {
  try {
    // Delete the team document from Firestore
    await deleteDoc(doc(db, 'Teams', teamId));
    
    // Update UI by filtering out the deleted team
    const updatedActiveTeams = activeTeams.filter(team => team.id !== teamId);
    const updatedSuspendedTeams = suspendedTeams.filter(team => team.id !== teamId);
    
    teamsDispatch({ type: 'SET_ACTIVE_TEAMS', payload: updatedActiveTeams });
    teamsDispatch({ type: 'SET_SUSPENDED_TEAMS', payload: updatedSuspendedTeams });

    // You may want to update localStorage as well
    localStorage.setItem('activeTeams', JSON.stringify(updatedActiveTeams));
    localStorage.setItem('suspendedTeams', JSON.stringify(updatedSuspendedTeams));

    console.log('Team deleted successfully:', teamId);
  } catch (error) {
    console.error('Error deleting team:', error);
  }
};

const [editedTeam, setEditedTeam] = useState<Team | null>(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const openEditModal = (team: Team) => {
  setEditedTeam(team);
  setIsEditModalOpen(true);
};

const closeEditModal = () => {
  setEditedTeam(null);
  setIsEditModalOpen(false);
};

const handleEditButtonClick = (teamId: string) => {
  console.log('Edit button clicked for team ID:', teamId);
  const teamToEdit = activeTeams.find((team) => team.id === teamId) || suspendedTeams.find((team) => team.id === teamId);
  console.log('Team to edit:', teamToEdit);
  if (teamToEdit) {
    setEditedTeam(teamToEdit);
    setIsEditModalOpen(true);
  }
};


const handleEditFormSubmit = async (updatedValues: Partial<Team>) => {
  console.log('Form submitted with updated values:', updatedValues);
  try {
    // Update the team document in Firestore
    const teamRef = doc(db, 'Teams', editedTeam?.id || '');
    await updateDoc(teamRef, updatedValues);
    console.log('Team updated successfully:', editedTeam?.id);
    // Close the modal
    closeEditModal();
    // Update the UI by fetching the latest data if needed
    // fetchData();
  } catch (error) {
    console.error('Error updating team:', error);
  }
};


  return (
    <div className='mb-2 -left-8  -mt-72 font-mono absolute '>
      <div className='-ml-8 '>
      {isModalOpen && <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'><AddTeamModal isOpen={isModalOpen}  onClose={closeModal} onSubmit={handleSubmitForm} /></div>}
      
      {editedTeam && (
       <EditTeamModal
       isOpen={isEditModalOpen}
       onClose={() => setIsEditModalOpen(false)}
       onSubmit={handleEditFormSubmit}
       team={editedTeam}
       closeEditModal={closeEditModal} // Pass closeEditModal as a prop
     />
   
    
      
      )}
      </div>
           
      {!displayIconsOnly && <h2 className="font-bold">Active Teams</h2>}
      <ul>
        {activeTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2 cursor-pointer space-y-2 ">
            {displayIconsOnly ? (
              <div
                className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center space-y-10  `}
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
                  className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center space-y-2`}
                  style={{
                    backgroundColor: team.color || 'brown',
                    color: 'white',
                  }}
                >
                  {team.name.charAt(0)}
                </div>
                <div className="font-semibold">
                  <div onClick={() =>handleTeamNameClick(team.members, team.id)}>
                    <div className="text-sm font-bold  text-primary-text">{team.name}</div>
                    <div className="text-xs text-secondary-text">{team.date_established?.seconds && new Date(team.date_established.seconds * 1000).toLocaleDateString()}</div>
                  </div>
                </div>


                <div className="flex ml-auto space-x-2 ">
                  <RiPencilFill
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditButtonClick(team.id)}
                  />
                  <RiDeleteBin6Line
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteButtonClick(team.id)}
                  />
                </div>
              </>
            )}
            
          </li>
        ))}
      </ul>

      {!displayIconsOnly && <h2 className="font-bold mt-4">Suspended Teams</h2>}
      <ul>
        {suspendedTeams.map((team) => (
          <li key={team.id} className="flex items-center mb-2 cursor-pointer  space-y-2">
            {displayIconsOnly ? (
              <div
                className={`rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center  `}
                style={{
                  backgroundColor: 'transparent', // Set background color to transparent
                  
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
                  <div onClick={() => handleTeamNameClick(team.members, team.id)}>
                    <div className="text-sm font-bold text-primary-text">{team.name}</div>
                    <div className="text-xs text-secondary-text">
                      {team.date_established?.seconds && new Date(team.date_established.seconds * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex ml-auto space-x-2">
                  <RiPencilFill
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditButtonClick(team.id)}
                  />
                  <RiDeleteBin6Line
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteButtonClick(team.id)}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

     
      <AddandEditButton onAddClick={handleAddButtonClick}  />
      {/* {isModalOpen && <AddTeamModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmitForm} />} */}
    </div>
  );
};

export default TeamList;
