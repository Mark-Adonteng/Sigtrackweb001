import React, { useState, ReactNode } from 'react';
import { useTeamContext } from '../../components/TeamContext';

interface SecondSectionProps {
  children: ReactNode;
}

const SecondSection: React.FC<SecondSectionProps> = ({ children }) => {
  const { isNarrowed1, toggleIsNarrowed1 } = useTeamContext();

  const [rotation, setRotation] = useState(0);

  const handleButtonClick = () => {
    const newRotation = rotation === 0 ? 180 : 0;
    setRotation(newRotation);
    toggleIsNarrowed1();
  };

  const wrapperStyles = {
    width: isNarrowed1 ? '2rem' : '300px',
    transition: 'width 0.1s ease-in-out',
  };

  const buttonStyles: React.CSSProperties = {
    position: 'absolute',
    right: '0.5rem',
    top: isNarrowed1 ? '0rem' : '0rem',
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div
      className="second-section z-20 ml-40 mt-[-0.5rem] absolute flex justify-center h-full items-center w-80 bottom-0 mr-auto bg-custom-bg"
      style={wrapperStyles}
    >
      <div className="content-wrapper">
        <button
          className={`arrow-button1 ${rotation === 180 ? 'rotate' : ''} arrow-button ml-48 text-4xl transform transition-transform duration-100 ease-in-out absolute border-none shadow-none bg-transparent`}
          onClick={handleButtonClick}
          style={buttonStyles}
        >
          {'<'}
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
