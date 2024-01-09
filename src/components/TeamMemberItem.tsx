import React from 'react';


export type TeamMemberModel={
  lat: string;
  lng: string;
  id: number;
  name: string;
  username: string;
}



const TeamMemberItem: React.FC<TeamMemberModel> = (teamMemberItemProps: TeamMemberModel) => {
  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {teamMemberItemProps.id}</p>
      <p>Name: {teamMemberItemProps.name}</p>
      <p>Username: {teamMemberItemProps.username}</p>
      <h3>Address:</h3>
      <h4>Geo Location:</h4>
      <p>Latitude: {teamMemberItemProps.lat}</p>
      <p>Longitude: {teamMemberItemProps.lng}</p>
    </div>
  );
};

export default TeamMemberItem;



