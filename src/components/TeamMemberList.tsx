// TeamMembersList.tsx
import React from 'react';
import TeamMemberItem, { TeamMemberModel } from './TeamMemberItem';
import { TeamItemModel } from './TeamItem';

export interface TeamMembersListProps {
  selectedTeamItem: TeamItemModel | null;
  membersData: TeamMemberModel[];
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ selectedTeamItem, membersData }: TeamMembersListProps) => {
  return (
    <div>
      {/* Display only the members related to the selected team item */}
      {selectedTeamItem &&
        membersData
          .filter((user) => user.id === selectedTeamItem.id)  // Assuming user.id is unique identifier
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
