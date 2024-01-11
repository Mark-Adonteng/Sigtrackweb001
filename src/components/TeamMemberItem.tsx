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
    
     <div className="flex items-center left-44 top-0 mt-28 fixed font-semibold text-primary-text mb-4">
      
      
      <div className="bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-sm ">{teamMemberItemProps.name}</div>
        {/* Assuming lat is the duration in your example */}
        <div className="text-xs" style={{ color: '#708090' }}>
          {teamMemberItemProps.lat} minutes
        </div>
      </div>
    </div>
    </>
   
  );
};

export default TeamMemberItem;
