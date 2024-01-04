// Update TeamsSection.tsx
import React from 'react';
import { TeamItemModel } from './TeamItem';
import TeamItem from './TeamItem';
import { useTeamContext } from '../components/TeamContext';

interface TeamSectionProps {
  title: string;
  teamItemList: TeamItemModel[];
}

const TeamsSection: React.FC<TeamSectionProps> = (teamSectionProps: TeamSectionProps) => {
  const { isNarrowed1, toggleIsNarrowed1 } = useTeamContext();

  const handleTeamItemClick = (teamItemName: string) => {
    // Add your logic for handling team item click if needed
    console.log(`Clicked on ${teamItemName}`);

    // Toggle the isNarrowed1 state in the TeamProvider only if isNarrowed1 is true
    if (isNarrowed1) {
      toggleIsNarrowed1();
    }
  };

  return (
    <div>
      <h1 className='font-bold text-lg'>{teamSectionProps.title}</h1>

      {teamSectionProps.teamItemList.map((teamItem, index) => (
        <TeamItem
          key={index}
          teamItemName={teamItem.teamItemName}
          icon={teamItem.icon}
          duration={teamItem.duration}
          backgroundColor={teamItem.backgroundColor}
          onClick={() => handleTeamItemClick(teamItem.teamItemName)}
        />
      ))}
    </div>
  );
};

export default TeamsSection;
