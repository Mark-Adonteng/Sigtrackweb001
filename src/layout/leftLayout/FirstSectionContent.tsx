import React from 'react'
import { useLogoutContext } from '../../Context/LogoutContext';

interface FirstSectionContentProps {
  onLogout: () => void;
}


const FirstSectionContent: React.FC<FirstSectionContentProps> = ({ onLogout }) => {
  const { handleLogout } = useLogoutContext();

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className='text-center ml-2'>
    <div>

      <div>
      <img
          src="/src/assets/images/SIGTRACK.png"  // Replace with the path to your image
          alt="Sigtrack Logo"
          className="mb-6   absolute w-12"      // Use mx-auto to center the image horizontally
          // Set a maximum width for the image
        />
      </div>
     

      <div>
      <img
          src="/src/assets/images/goggles.svg"  // Replace with the path to your image
          alt="Sigtrack Logo"
          className="mb-6   absolute w-10 mt-16 ml-1"      // Use mx-auto to center the image horizontally
          // Set a maximum width for the image
        />
           </div>

           <div>
          <img
            src="/src/assets/images/mesh.svg"
            alt="Sigtrack Logo"
            className="mb-6 absolute w-28 bottom-20 -ml-3 cursor-pointer"
            onClick={() => openLink('https://client.meshtastic.org/')} // Replace with your desired link
          />
        </div>

           <div>
          <img
            src="/src/assets/images/light.svg"
            alt="Sigtrack Logo"
            className="mb-6 absolute w-10 bottom-10 "
           
          />
        </div>

          <div>
            <img
          src="/src/assets/images/vector.svg"  // Replace with the path to your image
          alt="Sigtrack Logo"
          className="mb-6   absolute w-10 bottom-0 cursor-pointer"      // Use mx-auto to center the image horizontally
          onClick={handleLogout}
          // Set a maximum width for the image
        />

          </div>
        
    </div>
    </div>
  )
}

export default FirstSectionContent
