import React from 'react';

interface TeamMembersDisplayProps {
  selectedTeamName: string | null;
  members: string[];
}

const TeamMembersDisplay: React.FC<TeamMembersDisplayProps> = ({ selectedTeamName, members }) => {
  if (!selectedTeamName) {
    return null; // Don't render anything if no team is selected
  }

  return (
    <div>
      <h2>Members of {selectedTeamName}</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembersDisplay;
