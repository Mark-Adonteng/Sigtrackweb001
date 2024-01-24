import { db } from '../firebase';
import { collection, onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import TeamFieldsItem, { TeamFieldsModel } from './TeamFieldsItem'; 

interface Member {
 
  teamMembers: string[];
  TeamA: string[];
  TeamB: string[];
  // Add other member properties as needed
}


const MembersFetch: React.FC = () => {
  const [activeMembers, setActiveMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchActiveMembers = () => {
      const query = collection(db, 'Members');

      const unsubscribe = onSnapshot(query, (snapshot) => {
        const activeMembersData = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            teamMembers: data.teamMembers || [],
            TeamA: data.TeamA || [],
            TeamB: data.TeamB || [],
          };
        }) as Member[];

        setActiveMembers(activeMembersData);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchActiveMembers();
  }, []);

  return (
    <div>
      <ul>
        {activeMembers.map((member, index) => (
          <li key={index}>
            {/* Pass each member as props to TeamFieldsItem */}
            <TeamFieldsItem {...member} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersFetch;