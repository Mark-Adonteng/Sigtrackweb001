
import React from 'react';
import TeamsSection from './TeamsSection';
import PropTypes from 'prop-types';




const TeamListDisplay = ({ teamSectionTitles }) => {
  console.log(teamSectionTitles);
  return (
    <div className='font-semibold text-primary-text mb-4'>
     

     <div className='mt-10 mr-32 mb-4'>
     <TeamsSection
          title={teamSectionTitles.team}
          teamItemList={[
            { teamItemName: "Team A", icon: "A", duration: "2023-2024",  backgroundColor: "#ff0000" },
            { teamItemName: "Team B", icon: "B", duration: "2023-2024",  backgroundColor: "violet" },
            { teamItemName: "Team C", icon: "C", duration: "2023-2024",  backgroundColor: "green" },
            { teamItemName: "Team D", icon: "D", duration: "2023-2024",  backgroundColor: "brown" },
          
          ]}
        />

        <TeamsSection
          title={teamSectionTitles.team}
          teamItemList={[
            { teamItemName: "Team E", icon: "E", duration: "2023-2024", backgroundColor: "blue" },
            { teamItemName: "Team F", icon: "F", duration: "2023-2024", backgroundColor: "gold" },
            { teamItemName: "Team G", icon: "G", duration: "2023-2024", backgroundColor: "indigo" },
            { teamItemName: "Team H", icon: "H", duration: "2023-2024", backgroundColor: "black" },
            
          
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

