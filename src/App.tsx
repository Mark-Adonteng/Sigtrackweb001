// App.tsx
import React, { useState } from 'react';
import './App.css';
import RightLayout from './layout/rightLayout/RightLayout';
import RightLayoutContent from './layout/rightLayout/RightLayoutContent';
import LeftLayout from './layout/leftLayout/LeftLayout';
import MainLayout from './layout/mainLayout/MainLayout';
import MainLayoutContent from './layout/mainLayout/MainLayoutContent';
import { RightLayoutProvider } from './layout/rightLayout/RightLayoutContext';
import { SelectedMembersProvider } from './Context/membersContext';
import { NarrowProvider } from './Context/NarrowedContext';
import LoginPage from './pages/LoginPage/Login';
import GoogleAuth from './components/GoogleAuth';
import { OrganizationProvider } from './Context/organizationContext';
import { TeamIdProvider } from './Context/TeamIdContext';
import { LogoutProvider } from './Context/LogoutContext';
import { TeamMembersProvider } from './Context/TeamMembersContext';
import { MemberProvider } from './Context/MemberIdContext';

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [googleAuthenticated, setGoogleAuthenticated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = () => {
    if (!googleAuthenticated) {
      console.log('User has not authenticated with Google');
      return;
    }

    setLoggedIn(true);
  };

  const handleGoogleLogin = () => {
    console.log('Google login callback');
    setGoogleAuthenticated(true);
  };

  const handleLogout = () => {
    // Show the confirmation form
    setShowConfirmation(true);
  };

  const confirmLogout = (shouldLogout: boolean) => {
    if (shouldLogout) {
      window.location.reload();
      setLoggedIn(false);
      setGoogleAuthenticated(false);
      console.log('Logout successful!');
    }
    
    // Close the confirmation form
    setShowConfirmation(false);
  };


  return (
    <LogoutProvider handleLogout={handleLogout}>
      <SelectedMembersProvider>
        <TeamMembersProvider>
        <OrganizationProvider>
          <NarrowProvider>
            <TeamIdProvider>
              <MemberProvider>
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

                    {showConfirmation && (
                <div className="modal  fixed inset-0 bg-gray-900 text-black bg-opacity-70 flex justify-center items-center z-96 text-sm">
                  <div className="modal-content  bg-gray-200 text-black w-96 text-center rounded-lg shadow-md p-6  text-sm">
                    <p className='text-lg font-semibold mb-2'>Are you sure you want to logout?</p>
                    <div>
                      <button onClick={() => confirmLogout(true)}
                      className='w-20  bg-black text-white  font-bold rounded-sm  mt-6 mr-10'>Yes</button>
                      <button onClick={() => confirmLogout(false)}
                      className='w-20  bg-black text-white  font-bold rounded-sm  mt-6 mr-10'>No</button>
                    </div>
                  </div>
                </div>
              )}
                  </div>
                ) : (
                  // Display the Login Page after successful Google authentication
                  googleAuthenticated ? (
                    <LoginPage onLogin={handleLogin} />
                  ) : (
                    // Display the Google Authentication component if not authenticated
                    <GoogleAuth onGoogleLogin={handleGoogleLogin} />
                  ))}
              </div>
              </MemberProvider>
            </TeamIdProvider>
          </NarrowProvider>
        </OrganizationProvider>
        </TeamMembersProvider>
      </SelectedMembersProvider>
    </LogoutProvider>
  );
};

export default App;
