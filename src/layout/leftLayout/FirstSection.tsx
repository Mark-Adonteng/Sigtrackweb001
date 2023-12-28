import React, { ReactNode } from 'react';

interface FirstSectionProps {
  children: ReactNode;
}

const FirstSection: React.FC<FirstSectionProps> = ({ children }) => {
  return (
    <div className=" bg-red-400 w-40 h-screen top-0 bottom-0 z-30 -ml-0 absolute">
     
      
        <h1>C1</h1>
        {children}
      
      
    </div>
  )
}

export default FirstSection
