// TeamMembers.tsx
import React from 'react';
import getTeamMembers from './GetMmebers'

const TeamMembers: React.FC<{ teamName: string }> = ({ teamName }) => {
  const teamMembers = getTeamMembers(teamName);

  return (
    <div>
      <h2>{teamName} Members</h2>
      <ul>
        {teamMembers.map((member: { id: number; name: string }) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
