import React, { useState, useEffect } from 'react';

interface UserDataProps {
  userId: number; // Change to singular userId
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [userData, setUserData] = useState<any>(null); // Change to singular userData
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <div>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        {/* Display additional user data as needed */}
      </div>
    </div>
  );
};

export default UserData;
