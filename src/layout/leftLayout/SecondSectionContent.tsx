import React from 'react';
import TeamMembersDisplay from '../../components/TeamMembers' // Import the TeamMembersDisplay component

const SecondSectionContent = () => {
  // Mock data for the selected team name (replace with your logic to get the selected team)
  const selectedTeamName = 'Team A';
  const selectedTeamNames = 'Team B';

  return (
    <div className='info-btn'>
      {/* Render TeamMembersDisplay component with the selected team name */}
      <TeamMembersDisplay teamName={selectedTeamName} />
      <TeamMembersDisplay teamName={selectedTeamNames} />
    </div>
  );
};

export default SecondSectionContent;

