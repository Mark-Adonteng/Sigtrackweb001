// LoginPage.tsx
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform actual login logic here, e.g., make an API call
    // If successful, call onLogin();
    // If unsuccessful, handle the error or display an error message
    // For simplicity, let's assume login is successful for now.
    onLogin();
  };

  return (
    <div className="flex items-center justify-center h-screen">
       
         <div
    className="text-center justify-center w-96 h-[450px] bg-[rgb(217,_217,_217)] rounded-[60px]"
    >
          <img
          src="/src/assets/images/hue.png"  // Replace with the path to your image
          alt="Sigtrack Logo"
          className="mb-6 mt-6 ml-12 absolute"      // Use mx-auto to center the image horizontally
          style={{ maxWidth: '80px' }}  // Set a maximum width for the image
        />
        <h1 className='font-bold text-4xl mt-28 ml-10 absolute'> Sigtrack Login</h1>
        <div >
            <input type='email' placeholder='enter email' onChange={(e) => setemail(e.target.value)}
            className='w-80 h-[50px] bg-white font-bold text-gray-400 p-4 rounded-[15px] mt-44' />

            <input type='text' placeholder='enter password' onChange={(e) => setPassword(e.target.value)}
             className='w-80 h-[50px] bg-white font-bold text-gray-400 p-4 rounded-[15px] mt-4' />
        </div>

        <div>
            <button  onClick={handleLogin} className='w-32 h-[50px] bg-black text-white text-3xl font-bold rounded-[15px] mt-6 ml-44'>
                Sign In
            </button>
        </div>
        <hr className='text-white mt-2'></hr>
        <div>
            <p className='font-bold text-sm mr-20'>Not registered, click here to register</p>
        </div>

    </div>


    </div>
     
  );
};

export default LoginPage;
