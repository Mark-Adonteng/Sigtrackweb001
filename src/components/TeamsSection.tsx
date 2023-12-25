
import React from 'react';
import { TeamItemModel } from './TeamItem';
import TeamItem from './TeamItem';

export interface TeamSectionProps {
  title: string;
  teamItemList: TeamItemModel[];
}

const TeamsSection: React.FC<TeamSectionProps> = (teamSectionProps: TeamSectionProps) => {
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
        />
      ))}
    </div>
  );
};

export default TeamsSection;




