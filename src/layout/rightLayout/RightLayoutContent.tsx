
import React from 'react';
import Searchbar from '../../components/Searchbar';

import TeamIcon from '../../components/TeamListDisplay';


const RightLayoutContent = () => {
  return (
    <div className=' font-semibold text-primary-text mb-4'>
      <Searchbar />

     <TeamIcon
     teamSectionTitles={{ team: 'Team', suspendedTeam: 'Suspended Team' }}/>
      
    
      </div>
  
  );
};

export default RightLayoutContent;


