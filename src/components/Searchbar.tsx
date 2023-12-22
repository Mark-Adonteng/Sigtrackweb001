import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell } from '@fortawesome/free-solid-svg-icons';

 const Searchbar =() =>{
    return (
        < div className="-mt-36 mb-2 space-y-4">
    <div className="flex fixed ml-36 -mt-16 ">
      <FontAwesomeIcon icon={faCog} className="fixed text-gray-500 -mt-4" size="2x" />
      <FontAwesomeIcon icon={faBell} className="fixed text-gray-500 ml-16 -mt-4" size="2x"  />
    </div>
        <input type="text" 
        className="input border-none outline-none rounded-3xl
         p-4 bg-white transition duration-300 ease-in-out 
         shadow-inner md:shadow-md 
         first-letter: text-primary-text -ml-0 top-10 fixed h-10 w-64 " 
         placeholder="Search"></input>
        </div>

    )
 }

 export default Searchbar;