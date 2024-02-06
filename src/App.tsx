// App.tsx
import React from 'react';
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

const App: React.FC = () => {
  return (
    <SelectedMembersProvider>
    <NarrowProvider>
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
    </NarrowProvider>
    </SelectedMembersProvider>
   
  );
};

export default App;
