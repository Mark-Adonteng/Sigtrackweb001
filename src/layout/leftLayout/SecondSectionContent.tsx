// SecondSectionContent.tsx
import React, { useEffect } from 'react';
import { useTeamContext } from '../../components/TeamContext';
import TeamMembersList from '../../components/TeamMemberList';
import { TeamItemModel } from '../../components/TeamItem';
import { TeamMemberModel } from '../../components/TeamMemberItem';
import { fetchData } from '../../constants/Api'; // Import the fetchData function

import MembersFetch from '../../components/MembersFetch';
import TeamList from '../../components/TeamList';




interface SecondSectionContentProps {
  selectedTeamItem: TeamItemModel | null;
  setMembers: React.Dispatch<React.SetStateAction<TeamMemberModel[]>>;
}

const SecondSectionContent: React.FC<SecondSectionContentProps> = ({ setMembers }) => {
  const { selectedTeamItem, members } = useTeamContext();

  useEffect(() => {
    const fetchDataAndSetMembers = async () => {
      const teamMembers = await fetchData();
      if (teamMembers) {
        setMembers(teamMembers);
      }
    };

    fetchDataAndSetMembers();
  }, [setMembers]); // Add setMembers to the dependency array

  return (
    <div className='info-btn'>
      
      
      {selectedTeamItem && <TeamMembersList selectedTeamItem={selectedTeamItem} membersData={members} />}
     {/* <MembersFetch/> */}
     {/* <TeamList/>     */}
    </div>
  );
};

export default SecondSectionContent;
