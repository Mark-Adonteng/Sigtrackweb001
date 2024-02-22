// SecondSection.tsx
import React, { useState, ReactNode, useEffect } from 'react';
import { useNarrowContext } from '../../Context/NarrowedContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

interface SecondSectionProps {
  children: ReactNode;
}

const SecondSection: React.FC<SecondSectionProps> = ({ children }) => {
  const { isNarrowed1, toggleIsNarrowed1 } = useNarrowContext();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const newRotation = isNarrowed1 ? 180 : 0;
    setRotation(newRotation);
  }, [isNarrowed1]);

  const handleButtonClick = () => {
    toggleIsNarrowed1();
  };

  const wrapperStyles = {
    width: isNarrowed1 ? '1rem' : '300px',
    transition: 'width 0.1s ease-in-out',
  };


  return (
    <div
      className="second-section z-20 ml-16 mt-[-0.5rem] absolute flex justify-center h-full items-center w-80 bottom-0 mr-auto bg-primary-bg text-primary-text"
      style={wrapperStyles}
    >
      <div className="content-wrapper">
      <button
          className={`arrow-button1 ml-48 text-2xl text-secondary-text transform transition-transform duration-100 ease-in-out absolute border-none z-20
            shadow-none bg-transparent right-0.5 top-${isNarrowed1 ? '0' : '0'} ${rotation === 180 ? 'rotate-180' : ''} transition-transform duration-500 ease-in-out`}
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </div>

      {isNarrowed1 ? (
        <div className="ml-36 space-y-4">
          {/* Content when narrowed */}
        </div>
      ) : (
        <div style={{ position: 'absolute' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default SecondSection;
