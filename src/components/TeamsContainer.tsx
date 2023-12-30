import React, { useState } from 'react';
import TeamListDisplay from './TeamListDisplay';

const TeamContainer: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamItemClick = (teamName: string) => {
    setSelectedTeam(teamName);
  };

  return (
    <div>
      {/* First instance of TeamListDisplay */}
      <TeamListDisplay
        teamSectionTitles={{
          team: 'Active Teams',
          suspendedTeam: 'Suspended Teams',
        }}
        selectedTeam={selectedTeam}
        onTeamItemClick={handleTeamItemClick}
      />

      {/* Second instance of TeamListDisplay */}
      <TeamListDisplay
        teamSectionTitles={{
          team: 'Active Teams',
          suspendedTeam: 'Suspended Teams',
        }}
        selectedTeam={selectedTeam}
        onTeamItemClick={handleTeamItemClick}
      />
    </div>
  );
};

export default TeamContainer;
