import React from 'react';
import FetchMembersData from '../constants/Api'; // Update the path accordingly
import TeamMemberItem, { TeamMemberModel } from './TeamMemberItem'; // Update the path accordingly
import { TeamItemModel } from './TeamItem';

interface TeamMembersListProps {
  selectedTeamItem: TeamItemModel | null;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ selectedTeamItem }: TeamMembersListProps) => {
  // Fetch user data
  const membersData = FetchMembersData();

  return (
    <div>
     
      {/* Display only the members related to the selected team item */}
      {selectedTeamItem &&
        membersData
          .filter((user) => user.id === selectedTeamItem.id)
          .map((user: TeamMemberModel) => (
            <TeamMemberItem
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              lat={user.lat}
              lng={user.lng}
            />
          ))}
    </div>
  );
};

export default TeamMembersList;
