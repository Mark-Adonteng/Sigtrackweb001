import React from 'react';
import PropTypes from 'prop-types';

interface TeamMembersDisplayProps {
  teamName: string;
}

const TeamMembersDisplay: React.FC<TeamMembersDisplayProps> = ({ teamName }) => {
  const teamMembers = getMockTeamMembers(teamName);

  return (
    <div>
      <h2>Team Members for {teamName}</h2>
      <ul>
        {teamMembers.map((member: { id: number; name: string }) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

TeamMembersDisplay.propTypes = {
  teamName: PropTypes.string.isRequired,
};

const getMockTeamMembers = (teamName: string) => {
  const mockData: { [key: string]: { id: number; name: string }[] } = {
    'Team A': [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      // ... add more members for Team A
    ],
    'Team B': [
      { id: 3, name: 'Alice Johnson' },
      { id: 4, name: 'Bob Brown' },
      // ... add more members for Team B
    ],
    // Add more teams and members as needed
  };

  // Return team members based on the selected teamName
  return mockData[teamName] || [];
};

export default TeamMembersDisplay;
