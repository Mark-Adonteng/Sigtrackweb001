// App.tsx
import React from 'react';
import './App.css';
import RightLayout from './layout/rightLayout/RightLayout';
import RightLayoutContent from './layout/rightLayout/RightLayoutContent';
import LeftLayout from './layout/leftLayout/LeftLayout';
import MainLayout from './layout/mainLayout/MainLayout';
import MainLayoutContent from './layout/mainLayout/MainLayoutContent';
import { RightLayoutProvider } from './layout/rightLayout/RightLayoutContext';


const App: React.FC = () => {
  return (
    <div className='flex'>
      <LeftLayout />
      <MainLayout>
        <MainLayoutContent />
      </MainLayout>
      
      <RightLayoutProvider>
      <RightLayout >
        <RightLayoutContent />
      </RightLayout>
      </RightLayoutProvider>
     
    </div>
  );
};

export default App;
