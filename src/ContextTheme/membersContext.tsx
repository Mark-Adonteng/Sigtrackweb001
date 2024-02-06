// src/context/SelectedMembersContext.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SelectedMembersContextProps {
  selectedMembers: string | null;
  setSelectedMembers: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectedMembersContext = createContext<SelectedMembersContextProps | undefined>(undefined);

export const SelectedMembersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMembers, setSelectedMembers] = useState<string | null>(null);

  return (
    <SelectedMembersContext.Provider value={{ selectedMembers, setSelectedMembers }}>
      {children}
    </SelectedMembersContext.Provider>
  );
};

export const useSelectedMembers = () => {
  const context = useContext(SelectedMembersContext);
  if (!context) {
    throw new Error('useSelectedMembers must be used within a SelectedMembersProvider');
  }
  return context;
};