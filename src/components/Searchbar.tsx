import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCog, faBell } from '@fortawesome/free-solid-svg-icons';

 const Searchbar =() =>{
    return (
        < div className=" mb-6 space-y-4 absolute -left-10 bottom-72">
   
        <input type="text" 
        className="input border-none outline-none rounded-3xl
         p-4 bg-white h-10 w-64 " 
         placeholder="Search"></input>
        </div>

    )
 }

 export default Searchbar;