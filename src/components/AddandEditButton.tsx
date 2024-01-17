import React from 'react';
import { FaPen } from 'react-icons/fa'; // Assuming you have the React Icons library installed

const AddandEditButton = () => {
    return (
        <div className="flex space-x-4 fixed mt-48 ml-20">
            <button className="bg-white text-black px-4 py-2 rounded flex items-center">
                <FaPen />
            </button>
            <button className="bg-white text-black px-4 py-2 rounded">
                Add Team
            </button>
            
            
        </div>
    );
}

export default AddandEditButton;
