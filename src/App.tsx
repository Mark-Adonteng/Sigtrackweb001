// App.tsx
import React, { useState } from 'react';
import './App.css';
import RightLayout from './layout/rightLayout/RightLayout';
import RightLayoutContent from './layout/rightLayout/RightLayoutContent';
import LeftLayout from './layout/leftLayout/LeftLayout';
import MainLayout from './layout/mainLayout/MainLayout';
import MainLayoutContent from './layout/mainLayout/MainLayoutContent';
import { RightLayoutProvider } from './layout/rightLayout/RightLayoutContext';
import { TeamProvider } from './components/TeamContext';
import { SelectedMembersProvider } from './Context/membersContext';
import { NarrowProvider } from './Context/NarrowedContext';
import LoginPage from './pages/LoginPage/Login';
import GoogleAuth from './components/GoogleAuth';
import { OrganizationProvider } from './Context/organizationContext';

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [googleAuthenticated, setGoogleAuthenticated] = useState(false);


  const handleLogin = () => {
    if (!googleAuthenticated) {
      console.log('User has not authenticated with Google');
      // You can display an error message or take appropriate action
      return;
    }
 

    setLoggedIn(true);
  };
  const handleGoogleLogin = () => {
    // Handle Google login callback, e.g., update state or navigate to a different page
    console.log('Google login callback');
    setGoogleAuthenticated(true); // Set the Google authentication status to true
  };


  return (
    <SelectedMembersProvider>
      <OrganizationProvider>
      <NarrowProvider>
      <div>
      {isLoggedIn ? (
        <div className='flex flex-col h-screen '>
          {/* Left Layout */}
          <LeftLayout className='md:w-1/4 md:h-full' />

          {/* Main Layout */}
          <MainLayout className='md:w-1/2 md:h-full'>
            <MainLayoutContent />
          </MainLayout>

          {/* Right Layout */}
          <RightLayoutProvider>
            <RightLayout className='md:w-1/4 md:h-full'>
              <RightLayoutContent />
            </RightLayout>
          </RightLayoutProvider>
        </div>
      ) : (
        // Display the Login Page after successful Google authentication
        googleAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          // Display the Google Authentication component if not authenticated
          <GoogleAuth onGoogleLogin={handleGoogleLogin} />
        )
      )}


      </div>
        </NarrowProvider>


      </OrganizationProvider>
      </SelectedMembersProvider>
    );
};

export default App;
