import React  from 'react';

export type TeamFieldsModel = {
  teamMembers: string[];
  TeamA: string[];
  TeamB: string[];
  // Add other fields as needed
};


const TeamFieldsItem: React.FC<TeamFieldsModel> = (teamFieldsItemProps: TeamFieldsModel) => {
    return (
      <div className='-mt-36 space-y-10'>
        <div className="your-custom-style-for-team-fields fixed font-semibold text-primary-text mb-4 flex items-center justify-center">
         
  
          <div>
            <div className="text-sm relative">
              {/* Access and display values from the props */}
              <strong>Team Members:</strong>
              <ul>
                {teamFieldsItemProps.teamMembers.map((teamMember, teamIndex) => (
                  <li key={teamIndex}>
                    <div className="flex items-center">
                      <div className={`bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center group cursor-pointer `}>
                        {teamMember.charAt(0)} 
                      </div>
                      {teamMember}
                    </div>
                  </li>
                ))}
              </ul>
              
              <strong>TeamA:</strong>
              <ul>
                {teamFieldsItemProps.TeamA.map((teamAItem, teamAIndex) => (
                  <li key={teamAIndex}>
                    <div className="flex items-center">
                      <div className={`bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center group cursor-pointer `}>
                        {teamAItem.charAt(0)} {/* Display the first letter */}
                      </div>
                      {teamAItem}
                    </div>
                  </li>
                ))}
              </ul>
  
              <strong>TeamB:</strong>
              <ul>
                {teamFieldsItemProps.TeamB.map((teamBItem, teamBIndex) => (
                  <li key={teamBIndex}>
                    <div className="flex items-center">
                      <div className={`bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center group cursor-pointer `}>
                        {teamBItem.charAt(0)} {/* Display the first letter */}
                      </div>
                      {teamBItem}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TeamFieldsItem;
  