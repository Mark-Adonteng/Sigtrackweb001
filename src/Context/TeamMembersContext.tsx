// TeamMembersContext.tsx
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface MemberData {
  name: string;
  dateCreated: string | Date;
}

interface TeamMembersContextProps {
  teamMembers: MemberData[];
  setTeamMembers: Dispatch<SetStateAction<MemberData[]>>;
}

const TeamMembersContext = createContext<TeamMembersContextProps | undefined>(undefined);

export const TeamMembersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = React.useState<MemberData[]>([]);

  return (
    <TeamMembersContext.Provider value={{ teamMembers, setTeamMembers }}>
      {children}
    </TeamMembersContext.Provider>
  );
};

export const useTeamMembersContext = () => {
  const context = useContext(TeamMembersContext);
  if (!context) {
    throw new Error('useTeamMembersContext must be used within a TeamMembersProvider');
  }
  return context;
};
