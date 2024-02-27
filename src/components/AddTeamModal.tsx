// AddTeamModal.tsx

import React, { useState } from 'react';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    newTeamName: string;
    userEnteredStatus: string;
    userEnteredColor: string;
    userEnteredDescription: string;
  }) => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [newTeamName, setNewTeamName] = useState('');
  const [userEnteredStatus, setUserEnteredStatus] = useState('');
  const [userEnteredColor, setUserEnteredColor] = useState('');
  const [userEnteredDescription, setUserEnteredDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({
      newTeamName,
      userEnteredStatus,
      userEnteredColor,
      userEnteredDescription,
    });
    onClose();
  };

  return (
    <div className='fixed  bg-white text-black w-96 rounded-lg shadow-md p-6 '>
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title text-center" >Enter Team Details</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Team Name:</label>
            <input
              className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 "
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">Status (active/suspended):</label>
            <input
              className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={userEnteredStatus}
              onChange={(e) => setUserEnteredStatus(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">Color:</label>
            <input
              className="input bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={userEnteredColor}
              onChange={(e) => setUserEnteredColor(e.target.value)}
            />
          </div>
          <div className="field ">
            <label className="label top-20 ">Description:</label>
            <textarea
              className="input bg-gray-100 text-gray-800 border-0 ml-3 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
              
              value={userEnteredDescription}
              onChange={(e) => setUserEnteredDescription(e.target.value)}
            />
          </div>
        </section>
        <footer className="modal-card-foot text-center">
          <button className="button is-success w-20  bg-black text-white text-2xl font-bold rounded-sm  mt-6 mr-10" onClick={handleSubmit}>
            Save
          </button>
          <button className="button button is-success w-24  bg-black text-white text-2xl font-bold rounded-sm mt-6" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
    </div>
  );
};

export default AddTeamModal;



{/* <div class="flex flex-col items-center justify-center h-screen light">
  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Product Feedback Form</h2>

    <form class="flex flex-col">
      <input placeholder="Full Name" class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text">
      <input placeholder="Email" class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email">
   
      <input placeholder="Rating (1-5)" class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="number">
      <textarea placeholder="Feedback" class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" name="feedback"></textarea>

      <button class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">Submit</button>
    </form>
  </div>
</div> */}
