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
import { SelectedMembersProvider } from './ContextTheme/membersContext';
import { NarrowProvider } from './ContextTheme/NarrowedContext';
import LoginPage from './pages/LoginPage/Login';

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform actual login logic here, e.g., make an API call
    // If successful, setLoggedIn(true);
    // If unsuccessful, handle the error or display an error message
    // For simplicity, let's assume login is successful for now.
    setLoggedIn(true);
  };

  return (
    <SelectedMembersProvider>
      <NarrowProvider>
        {isLoggedIn ? (
          <div className='flex flex-col h-screen'>
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
          // Display the Login Page
          <LoginPage onLogin={handleLogin} />
        )}
      </NarrowProvider>
    </SelectedMembersProvider>
  );
};

export default App;
