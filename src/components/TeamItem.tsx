import React from 'react';
import { IsRightLayoutNarrowedContext } from '../layout/rightLayout/RightLayout';
import { useContext } from 'react';

export type TeamItemModel = {
  teamItemName: string;
  icon: string;
  duration: string;
  backgroundColor: string;
};

const TeamItem: React.FC<TeamItemModel> = (teamItemProps: TeamItemModel) => {
  const rightLayoutNarrow = useContext(IsRightLayoutNarrowedContext);

  return (
    <div className="flex flex-col -mt-70">
      <div className="flex items-center mb-2">
        <div
          className={`text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center`}
          style={{ backgroundColor: teamItemProps.backgroundColor }}
        >
          {teamItemProps.icon}
        </div>

        {!rightLayoutNarrow && (
          <div>
            <div className="text-sm">{teamItemProps.teamItemName}</div>
            <div className="text-xs" style={{ color: '#708090' }}>
              {teamItemProps.duration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamItem;
