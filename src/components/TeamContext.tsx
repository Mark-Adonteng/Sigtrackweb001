// TeamContext.tsx
import { createContext, useReducer, useContext, ReactNode } from 'react';

interface TeamState {
  icon: string;
  backgroundColor: string;
}

type TeamAction =
  | { type: 'SET_ICON'; payload: string }
  | { type: 'SET_BACKGROUND_COLOR'; payload: string };

interface TeamContextProps {
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

const teamReducer = (state: TeamState, action: TeamAction): TeamState => {
  switch (action.type) {
    case 'SET_ICON':
      return { ...state, icon: action.payload };
    case 'SET_BACKGROUND_COLOR':
      return { ...state, backgroundColor: action.payload };
    default:
      return state;
  }
};

const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(teamReducer, {
    icon: '',
    backgroundColor: '',
  });

  return (
    <TeamContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamContext.Provider>
  );
};

const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};

export { TeamProvider, useTeam };
