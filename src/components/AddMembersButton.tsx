import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { db } from '../services/firebase';
import { collection, addDoc, doc, runTransaction } from 'firebase/firestore';
import { useOrganizationContext } from '../Context/organizationContext';
import { Team } from './TeamList';

export interface AddMembersProps {
  onAddMembersClick: () => void;

}

interface Member {
  userId: string;
  callSign: string;
  name: string;
  dateCreated: {
    seconds: number;
    nanoseconds: number;
  };
  latitude: number;
  longitude: number;
  password: string;
  status: string;
  user_type: string;
  organization?: string;
}

// ... (existing imports)

const AddMembersButton: React.FC<AddMembersProps> = ({ onAddMembersClick }) => {
  const { enteredOrganization } = useOrganizationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Member>({
    userId: '',
    callSign: '',
    name: '',
    dateCreated: { seconds: 0, nanoseconds: 0 },
    latitude: 0,
    longitude: 0,
    password: '',
    status: '',
    user_type: '',
    organization: enteredOrganization || '',
  });

  const handleAddMemberClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async () => {
    try {
      // Add validation logic here if needed

      // Add the new member to Firestore
      const memberDocRef = await addDoc(collection(db, 'users'), formData);

      // Update the corresponding team's document in the Teams collection
      const teamIdToUpdate = 'teamId'; // Replace 'teamId' with the actual team ID
      const teamDocRef = doc(db, 'Teams', teamIdToUpdate);

      await runTransaction(db, async (transaction) => {
        const teamDoc = await transaction.get(teamDocRef);

        if (teamDoc.exists()) {
          const teamData = teamDoc.data() as Team;
          const updatedMembers = [...teamData.members, memberDocRef];

          // Update the team's members field in Firestore within a transaction
          transaction.update(teamDocRef, { members: updatedMembers });
        } else {
          console.error(`Team document not found for team ID: ${teamIdToUpdate}`);
        }
      });

      console.log('New member added with ID:', memberDocRef.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding new member:', error);
    }
  };
  return (
    <div className="flex space-x-4 absolute top-72 mr-32 -left-28 w-96 text-black">
      <button className="bg-white text-black px-4 py-2 rounded" onClick={handleAddMemberClick}>
        Add Members
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
          <h2 className='text-center'>Member Details</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label>Call Sign:</label>
              <input
                type="text"
                value={formData.callSign}
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={(e) => setFormData({ ...formData, callSign: e.target.value })}
              />
            </div>
            <div>
              <label>Status (active/suspended):</label>
              <select
                value={formData.status}
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label>User Type (admin/user):</label>
              <select
                value={formData.user_type}
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label>Latitude:</label>
              <input
                type="number"
                value={formData.latitude}
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label>Longitude:</label>
              <input
                type="number"
                value={formData.longitude}
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              onClick={handleFormSubmit}
              className="button is-success w-20 bg-black text-white text-2xl font-bold rounded-sm mt-6 mr-10"
            >
              Submit
            </button>
            <button
              onClick={handleModalClose}
              className="button button is-success w-24 bg-black text-white text-2xl font-bold rounded-sm mt-6"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMembersButton;
