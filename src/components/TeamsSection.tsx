import React from 'react';
import { TeamItemModel } from './TeamItem';
import TeamItem from './TeamItem';
import { useTeamContext } from './TeamContext';
import { fetchData } from '../constants/Api';
import TeamMembersList from './TeamMemberList';
; // Update the path accordingly

interface TeamSectionProps {
  title: string;
  teamItemList: TeamItemModel[];
}

// TeamsSection.tsx
// ...

const TeamsSection: React.FC<TeamSectionProps> = (teamSectionProps: TeamSectionProps) => {
  const { isNarrowed1, toggleIsNarrowed1, setSelectedTeamItem, setMembers } = useTeamContext();


  const handleTeamItemClick = async (teamItem: TeamItemModel) => {
    console.log(`Clicked on item with ID: ${teamItem.id} Team`);
    if (isNarrowed1) {
      toggleIsNarrowed1();
    }

    // Set the selected team item and fetch members data
    setSelectedTeamItem(teamItem);

    // Move the data fetching logic here
    const teamMembers = await fetchData();
    console.log('Fetched team members:', teamMembers);

    if (teamMembers) {
      setMembers(teamMembers);
    }
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

  
    </div>
  );
};

export default TeamsSection;
