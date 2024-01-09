import React from 'react';
import TeamMembersList from '../../components/TeamMemberList';
import { TeamItemModel } from '../../components/TeamItem';

interface SecondSectionContentProps {
  selectedTeamItem: TeamItemModel | null;
}

const SecondSectionContent: React.FC<SecondSectionContentProps> = ({ selectedTeamItem }: SecondSectionContentProps) => {
  return (
    <div className='info-btn'>
      <h1>Team Members</h1>
      {/* Display the selected team item data */}
      {selectedTeamItem ? (
        <div>
          
          <p>ID: {selectedTeamItem.id}</p>
          <p>Name: {selectedTeamItem.teamItemName}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No team item selected</p>
      )}

      {/* Display the team members list for the selected team item */}
      <TeamMembersList selectedTeamItem={selectedTeamItem} />
    </div>
  );
};

export default SecondSectionContent;
