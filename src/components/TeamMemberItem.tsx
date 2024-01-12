import React from 'react';

export type TeamMemberModel = {
  lat: string;
  lng: string;
  id: number;
  name: string;
  username: string;
};

const TeamMemberItem: React.FC<TeamMemberModel> = (teamMemberItemProps: TeamMemberModel) => {
  const icon = teamMemberItemProps.name.charAt(0).toUpperCase();

  return (
    <>
    <h1 className='-mt-80 fixed font-bold text-primary-text -ml-32'>Team Members</h1>
      <div className="flex items-center left-44 top-0 mt-24 fixed font-semibold text-primary-text mb-4">
        
        <div className="bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-sm hover-container relative">
            <span className="hover-text" data-text={`Name: ${teamMemberItemProps.name}\nCall Sign: ${teamMemberItemProps.username}`}>
              {teamMemberItemProps.name}
            </span>
          </div>
          {/* Assuming lat is the duration in your example */}
          <div className="text-xs" style={{ color: '#708090' }}>
            {teamMemberItemProps.lat} minutes
          </div>
        </div>
      </div>
      <style jsx>{`
        .hover-text::after {
          content: attr(data-text);
          white-space: pre; /* Preserve newline characters */
          position: absolute;
          width: 12rem; /* Adjusted width for longer text */
          top: 100%;
          margin-top:-2rem;
          margin-left:9rem;
          height:7rem;
          left: 30;
          opacity: 0;
          visibility: hidden;
          background-color: #fff;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: opacity 0.3s, visibility 0.3s;
        }

        .hover-container:hover .hover-text::after {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default TeamMemberItem;
