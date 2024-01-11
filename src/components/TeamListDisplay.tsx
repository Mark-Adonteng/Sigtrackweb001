// TeamListDisplay.tsx
import React from 'react';
import TeamsSection from './TeamsSection';
import PropTypes from 'prop-types';

const TeamListDisplay: React.FC<{ teamSectionTitles: { team: string; suspendedTeam: string } }> = ({ teamSectionTitles }) => {
  console.log(teamSectionTitles);
  return (
    <div className='font-semibold text-primary-text mb-4'>
      <div className='mt-4 mr-32 mb-4'>
        <TeamsSection
          title={teamSectionTitles.team}
          teamItemList={[
            { id: 1, teamItemName: "Team A", icon: "A", duration: "2023-2024", backgroundColor: "#ff0000"},
            { id: 2, teamItemName: "Team B", icon: "B", duration: "2023-2024", backgroundColor: "violet"},
            { id: 3, teamItemName: "Team C", icon: "C", duration: "2023-2024", backgroundColor: "green"},
            { id: 4, teamItemName: "Team D", icon: "D", duration: "2023-2024", backgroundColor: "brown" },
            // ... (repeat for other items)
          ]}
        />
       

        <TeamsSection
          title={teamSectionTitles.suspendedTeam}
          teamItemList={[
            { id: 5, teamItemName: "Team E", icon: "E", duration: "2023-2024", backgroundColor: "blue",},
            { id: 6, teamItemName: "Team F", icon: "F", duration: "2023-2024", backgroundColor: "gold"},
            { id: 7, teamItemName: "Team G", icon: "G", duration: "2023-2024", backgroundColor: "indigo"},
            { id: 8, teamItemName: "Team H", icon: "H", duration: "2023-2024", backgroundColor: "black" },
            // ... (repeat for other items)
          ]}
        />
      </div>
    </div>
    
  );
};

TeamListDisplay.propTypes = {
  teamSectionTitles: PropTypes.shape({
    team: PropTypes.string.isRequired,
    suspendedTeam: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamListDisplay;

