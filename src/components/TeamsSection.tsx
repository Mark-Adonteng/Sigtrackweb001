import React, { useState } from 'react';
import { TeamItemModel } from './TeamItem';
import TeamItem from './TeamItem';
import { useTeamContext } from '../components/TeamContext';
import FetchMembersData from '../constants/Api';
import TeamMembersList from './TeamMemberList'; // Update the path accordingly

interface TeamSectionProps {
  title: string;
  teamItemList: TeamItemModel[];
}

const TeamsSection: React.FC<TeamSectionProps> = (teamSectionProps: TeamSectionProps) => {
  const { isNarrowed1, toggleIsNarrowed1 } = useTeamContext();
  const members = FetchMembersData();
  const [selectedTeamItem, setSelectedTeamItem] = useState<TeamItemModel | null>(null);

  const handleTeamItemClick = (teamItem: TeamItemModel) => {
    console.log(`Clicked on item with ID: ${teamItem.id} Team`);
    if (isNarrowed1) {
      toggleIsNarrowed1();
    }

    // Set the selected team item
    setSelectedTeamItem(teamItem);
  };

  return (
    <div>
      <h1 className='font-bold text-lg'>{teamSectionProps.title}</h1>

      {teamSectionProps.teamItemList.map((teamItem) => (
        <div key={teamItem.id}>
          <TeamItem
            id={teamItem.id}
            teamItemName={teamItem.teamItemName}
            icon={teamItem.icon}
            duration={teamItem.duration}
            backgroundColor={teamItem.backgroundColor}
            onClick={() => handleTeamItemClick(teamItem)}
          />
        </div>
      ))}

      {/* Pass the selected team item information to TeamMembersList */}
      <TeamMembersList selectedTeamItem={selectedTeamItem} />
    </div>
  );
};

export default TeamsSection;
