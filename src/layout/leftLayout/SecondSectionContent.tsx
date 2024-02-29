import React, { useState, useEffect, useRef } from 'react';
import { RiPencilFill, RiDeleteBin6Line } from 'react-icons/ri';
import MemberPopup from '../../components/Popup';
import { useSelectedMembers } from '../../Context/membersContext';
import AddMembersButton from '../../components/AddMembersButton';

interface AddMembersProps {
  onAddMembersClick: () => void;
}

const SecondSectionContent = () => {
  const { selectedMembers, dispatch } = useSelectedMembers();
  const [popupVisible, setPopupVisible] = useState(true);
  const [selectedMember, setSelectedMember] = useState<{ name: string; dateCreated: string } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const memberRef = useRef<HTMLDivElement>(null);
  let timer: NodeJS.Timeout;

  const handleMemberClick = (name: string, dateCreated: string, event: React.MouseEvent<HTMLDivElement>) => {
    setPopupVisible(true);
    setSelectedMember({ name, dateCreated });
  };

  const handlePopupMouseEnter = () => {
    clearTimeout(timer);
  };

  const handlePopupMouseLeave = () => {
    startTimeout();
  };

  const startTimeout = () => {
    timer = setTimeout(() => {
      setPopupVisible(false);
      setSelectedMember(null);
    }, 5000);
  };

  useEffect(() => {
    startTimeout();
    return () => clearTimeout(timer);
  }, [popupVisible]);

  useEffect(() => {
    // Save selectedMembers to local storage
    localStorage.setItem('selectedMembers', JSON.stringify(selectedMembers));
  }, [selectedMembers]);

  useEffect(() => {
    // Load selectedMembers from local storage
    const loadedSelectedMembers = localStorage.getItem('selectedMembers');
    if (loadedSelectedMembers) {
      dispatch({ type: 'SET_SELECTED_MEMBERS', payload: JSON.parse(loadedSelectedMembers) });
    }
  }, [dispatch]);

  const handleAddMembers = async () => {
    // Add logic for adding members
  };

  return (
    <div className="font-mono font-bold">
      {selectedMembers && selectedMembers.trim() !== '' ? (
        <div className="fixed top-8 -ml-32">
          <h3 className="font-bold">Team Members</h3>
          <ul>
            {selectedMembers.split(',').map((member, index) => {
              const [name, dateCreated] = member.trim().split(' ');

              return (
                <li key={index} className="flex items-center mb-4">
                <div
                  ref={memberRef}
                  className="bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center cursor-pointer"
                  onClick={(event) => handleMemberClick(name, dateCreated, event)}
                >
                  {name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div
                    className="text-sm font-bold cursor-pointer"
                    onClick={(event) => handleMemberClick(name, dateCreated, event)}
                  >
                    {name}
                  </div>
                  <div className="flex items-center absolute space-x-2 ml-36 mt-1"> {/* Adjusted spacing here */}
                    <RiPencilFill
                      className="text-primary cursor-pointer"
                      onClick={() => {
                        // Add logic for editing member
                        console.log(`Edit ${name}`);
                      }}
                    />
                    <RiDeleteBin6Line
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        // Add logic for deleting member
                        console.log(`Delete ${name}`);
                      }}
                    />
                  </div>
                  <div className="text-xs text-secondary-text "> {/* Adjusted spacing here */}
                    {new Date(dateCreated).toLocaleDateString()}
                  </div>
                </div>
              </li>
            );
            })}
          </ul>
        </div>
      ) : (
        <div className="fixed top-8 -ml-32">
          <h3 className="font-bold">Team Members</h3>
          <p>No members</p>
        </div>
      )}

      <div ref={popupRef} onMouseEnter={handlePopupMouseEnter} onMouseLeave={handlePopupMouseLeave}>
        {popupVisible && selectedMember && (
          <div className="absolute w-72 bottom-48 ml-36 text-black bg-white p-2 rounded whitespace-pre">
            <MemberPopup
              memberName={selectedMember.name}
              dateCreated={selectedMember.dateCreated}
              onClose={() => {
                setPopupVisible(false);
                setSelectedMember(null);
              }}
            />
          </div>
        )}
      </div>
      <AddMembersButton onAddMembersClick={handleAddMembers} teamId='teamId'/>
    </div>
  );
};

export default SecondSectionContent;
