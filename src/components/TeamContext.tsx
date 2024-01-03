// import React, { createContext, useContext, ReactNode, useState } from 'react';

// interface TeamContextProps {
//   isNarrowed1: boolean;
//   toggleIsNarrowed1: () => void;
// }

// const TeamContext = createContext<TeamContextProps | undefined>(undefined);

// export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isNarrowed1, setIsNarrowed1] = useState(false);

//   const toggleIsNarrowed1 = () => {
//     setIsNarrowed1((prevIsNarrowed) => !prevIsNarrowed);
//   };

//   return (
//     <TeamContext.Provider value={{ isNarrowed1, toggleIsNarrowed1 }}>
//       {children}
//     </TeamContext.Provider>
//   );
// };

// export const useTeamContext = () => {
//   const context = useContext(TeamContext);
//   if (!context) {
//     throw new Error('useTeamContext must be used within a TeamProvider');
//   }
//   return context;
// };




import React, { createContext, useContext, ReactNode, useState } from 'react';

interface TeamContextProps {
  isNarrowed1: boolean;
  toggleIsNarrowed1: () => void;
}

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNarrowed1, setIsNarrowed1] = useState(false);

  const toggleIsNarrowed1 = () => {
    setIsNarrowed1((prevIsNarrowed) => !prevIsNarrowed);
  };

  return (
    <TeamContext.Provider value={{ isNarrowed1, toggleIsNarrowed1 }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }

  const toggleSecondSection = () => {
    context.toggleIsNarrowed1();
  };

  return { ...context, toggleSecondSection };
};
