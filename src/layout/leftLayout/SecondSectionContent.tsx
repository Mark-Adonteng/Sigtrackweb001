// // SecondSectionContent.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import MemberPopup from '../../components/Popup';
// import { useSelectedMembers } from '../../ContextTheme/membersContext';

// const SecondSectionContent = () => {
//   const { selectedMembers, setSelectedMembers } = useSelectedMembers();
//   const [popupVisible, setPopupVisible] = useState(true);
//   const [selectedMember, setSelectedMember] = useState<{ name: string; dateCreated: string } | null>(null);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const memberRef = useRef<HTMLDivElement>(null);
//   let timer: NodeJS.Timeout;

//   const handleMemberClick = (name: string, dateCreated: string, event: React.MouseEvent<HTMLDivElement>) => {
//     setPopupVisible(true);
//     setSelectedMember({ name, dateCreated });
//   };

//   const handlePopupMouseEnter = () => {
//     clearTimeout(timer);
//   };

//   const handlePopupMouseLeave = () => {
//     startTimeout();
//   };

//   const startTimeout = () => {
//     timer = setTimeout(() => {
//       setPopupVisible(false);
//       setSelectedMember(null);
//     }, 5000);
//   };

//   useEffect(() => {
//     startTimeout();
//     return () => clearTimeout(timer);
//   }, [popupVisible]);

//   useEffect(() => {
//     // Save selectedMembers to local storage
//     localStorage.setItem('selectedMembers', selectedMembers || '');
//   }, [selectedMembers]);

//   useEffect(() => {
//     // Load selectedMembers from local storage
//     const loadedSelectedMembers = localStorage.getItem('selectedMembers');
//     if (loadedSelectedMembers) {
//       setSelectedMembers(loadedSelectedMembers);
//     }
//   }, [setSelectedMembers]);

//   return (
//     <div>
//       {/* Display the selected members */}
//       {selectedMembers && (
//         <div className="fixed top-8 -ml-32">
//           <h3 className="font-bold">Team Members</h3>
//           <ul>
//             {selectedMembers.split(',').map((member, index) => {
//               const [name, ...dateCreatedArray] = member.trim().split(' ');
//               const dateCreated = dateCreatedArray.join(' ');

//               return (
//                 <li key={index} className="flex items-center mb-2">
//                   <div
//                     ref={memberRef}
//                     className="bg-red-500 text-white rounded-md p-2 w-8 h-8 mr-2 flex items-center justify-center cursor-pointer"
//                     onClick={(event) => handleMemberClick(name, dateCreated, event)}
//                   >
//                     {name.charAt(0)}
//                   </div>
//                   <div className="flex flex-col">
//                     <div
//                       className="text-sm font-bold cursor-pointer"
//                       onClick={(event) => handleMemberClick(name, dateCreated, event)}
//                     >
//                       {name}
//                     </div>
//                     <div
//                       className="text-xs text-secondary-text cursor-pointer"
//                       onClick={(event) => handleMemberClick(name, dateCreated, event)}
//                     >
//                       {dateCreated}
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       {/* Render the popup if it's visible */}
//       <div ref={popupRef} onMouseEnter={handlePopupMouseEnter} onMouseLeave={handlePopupMouseLeave}>
//         {popupVisible && selectedMember && (
//           <div className='absolute w-72 bottom-48 ml-36 text-black bg-white p-2 rounded whitespace-pre'>
//             <MemberPopup
//               memberName={selectedMember.name}
//               dateCreated={selectedMember.dateCreated}
//               onClose={() => {
//                 setPopupVisible(false);
//                 setSelectedMember(null);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SecondSectionContent;



// SecondSectionContent.tsx

import React, { useState, useEffect, useRef } from 'react';
import MemberPopup from '../../components/Popup';
import { useSelectedMembers } from '../../ContextTheme/membersContext';

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
    localStorage.setItem('selectedMembers', selectedMembers || '');
  }, [selectedMembers]);

  useEffect(() => {
    // Load selectedMembers from local storage
    const loadedSelectedMembers = localStorage.getItem('selectedMembers');
    if (loadedSelectedMembers) {
      dispatch({ type: 'SET_SELECTED_MEMBERS', payload: loadedSelectedMembers });
    }
  }, [dispatch]);

  return (
    <div>
      {/* Display the selected members */}
      {selectedMembers && (
        <div className="fixed top-8 -ml-32">
          <h3 className="font-bold">Team Members</h3>
          <ul>
            {selectedMembers.split(',').map((member, index) => {
              const [name, ...dateCreatedArray] = member.trim().split(' ');
              const dateCreated = dateCreatedArray.join(' ');

              return (
                <li key={index} className="flex items-center mb-2">
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
                    <div
                      className="text-xs text-secondary-text cursor-pointer"
                      onClick={(event) => handleMemberClick(name, dateCreated, event)}
                    >
                      {dateCreated}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Render the popup if it's visible */}
      <div ref={popupRef} onMouseEnter={handlePopupMouseEnter} onMouseLeave={handlePopupMouseLeave}>
        {popupVisible && selectedMember && (
          <div className='absolute w-72 bottom-48 ml-36 text-black bg-white p-2 rounded whitespace-pre'>
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
    </div>
  );
};

export default SecondSectionContent;

