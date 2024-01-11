// // useUserDataFetch.ts
// import { useState, useEffect } from 'react';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

// // TeamMembersFetcher.tsx

import { ConvertUsersToTeamMembers } from './Helpers';



 export const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json() as User[];
    const teamMembers = ConvertUsersToTeamMembers(data)

    return teamMembers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};



