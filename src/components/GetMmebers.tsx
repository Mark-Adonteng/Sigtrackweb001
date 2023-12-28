// GetMembers.tsx
const teamMembersData: Record<string, { id: number; name: string }[]> = {
    "Team A": [
      { id: 1, name: "John Doe" },
      // ... (other members)
    ],
    "Team B": [
      { id: 3, name: "Bob Johnson" },
      // ... (other members)
    ],
    // ... (other teams)
  };
  
  const getTeamMembers = (teamName: string) => {
    return teamMembersData[teamName] || [];
  };
  
  export default getTeamMembers;
  