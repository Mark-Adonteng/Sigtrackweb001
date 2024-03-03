import React, { useState } from 'react';
import { RiPencilFill, RiDeleteBin6Line } from 'react-icons/ri';

interface TeamMembersProps {
  teamMembers: Array<{ name: string; dateCreated: string | Date }>;
  formatDate: (date: string | Date) => string;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ teamMembers, formatDate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{ name: string; dateCreated: string | Date } | null>(null);

  const handleMemberClick = (name: string, dateCreated: string | Date, event: React.MouseEvent<HTMLDivElement>) => {
    // Set the data for the clicked member
    setFormData({ name, dateCreated });
    // Display the form
    setShowForm(true);
  };

  const handleEditClick = (name: string) => {
    // Add your logic for editing member
    console.log(`Edit ${name}`);
  };

  const handleDeleteClick = (name: string) => {
    // Add your logic for deleting member
    console.log(`Delete ${name}`);
  };

  return (
    <div className="fixed top-8 -ml-32">
      <h3 className="font-bold">Team Members</h3>
      <ul>
        {teamMembers.length === 0 ? (
          <li className="text-secondary-text">No members in this team</li>
        ) : (
          teamMembers.map((member, index) => (
            <li key={index} className="flex items-center mb-4">
              <div
                className="bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center cursor-pointer"
                onClick={(event) => handleMemberClick(member.name, member.dateCreated, event)}
              >
                {member.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <div
                  className="text-sm font-bold cursor-pointer"
                  onClick={(event) => handleMemberClick(member.name, member.dateCreated, event)}
                >
                  {member.name}
                </div>
                <div className="flex items-center absolute space-x-2 ml-36 mt-1">
                  <RiPencilFill
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditClick(member.name)}
                  />
                  <RiDeleteBin6Line
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteClick(member.name)}
                  />
                </div>
                <div className="text-xs text-secondary-text">
                  {formatDate(member.dateCreated)}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Display form when showForm is true */}
      {showForm && (
        <div className="fixed top-40 left-[540px] transform -translate-x-1/2 -translate-y-1/2 bg-white z-auto text-black p-4 rounded shadow-md w-80">
          <h2 className="text-lg font-semibold mb-2">Member Details</h2>
          <p>Name: {formData?.name}</p>
          <p>Date Created: {formatDate(formData?.dateCreated)}</p>
          <textarea
            className="w-full h-24 border border-gray-300 rounded-md p-2 mt-2"
            placeholder="Enter additional details..."
          />
        </div>
      )}
    </div>
  );
};

export default TeamMembers;