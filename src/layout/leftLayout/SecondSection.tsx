import { useState, ReactNode } from 'react';

interface SecondSectionProps {
  children: ReactNode;
}

const SecondSection: React.FC<SecondSectionProps> = ({ children }) => {
  const [rotation, setRotation] = useState(0);
  const [isNarrowed1, setIsNarrowed1] = useState(false);

  const handleButtonClick = () => {
    // Toggle between 0 and 180 degrees
    const newRotation = rotation === 0 ? 180 : 0;
    setRotation(newRotation);

    // Toggle between narrowed and expanded states
    setIsNarrowed1(!isNarrowed1);
  };

  const wrapperStyles = {
    width: isNarrowed1 ? '2rem' : '300px',
    transition: 'width 0.1s ease-in-out', // Adjusted transition duration
  };

  const buttonStyles = {
    position: 'absolute',
    right: '0.5rem',
    top: isNarrowed1 ? '0rem' : '0rem',
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.5s ease-in-out', // Keep the transition duration the same as the wrapper
  };

 

  return (
    <div className="second-section z-20 ml-40 mt-[-0.5rem] absolute 
      flex justify-center h-full items-center w-80 bottom-0 mr-auto bg-custom-bg"
      style={wrapperStyles}
    >
      <div className="content-wrapper">
        <button
          className={`arrow-button1 ${rotation === 180 ? 'rotate' : ''} arrow-button ml-48 text-4xl 
          transform transition-transform duration-100 ease-in-out absolute border-none shadow-none bg-transparent`}
          onClick={handleButtonClick}
          style={buttonStyles}
        >
          {'<'}
        </button>
      </div>
      <div className="content-here" >
        {children}
      </div>
    </div>
  );
};

export default SecondSection;
