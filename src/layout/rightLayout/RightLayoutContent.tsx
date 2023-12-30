
import React from 'react';
import Searchbar from '../../components/Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell } from '@fortawesome/free-solid-svg-icons';

import TeamListDisplay from '../../components/TeamListDisplay';


const RightLayoutContent = () => {
  return (
    <div className=' font-semibold text-primary-text mb-4'>
        <div className="flex fixed ml-36 -mt-24 ">
      <FontAwesomeIcon icon={faCog} className="fixed text-gray-500 -mt-0" size="2x" />
      <FontAwesomeIcon icon={faBell} className="fixed text-gray-500 ml-16 -mt-0" size="2x"  />
    </div>
      <Searchbar />

     <TeamListDisplay
     teamSectionTitles={{ team: 'Team', suspendedTeam: 'Suspended Team' }}/>
      
    
      </div>
  
  );
};

export default RightLayoutContent;


