import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';


const Skill = (props) => {
  const [skills, setSkills] = useState([]); // Example initial skills
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setIsPopupOpen(false);
    }
  };

  // Handle deleting a skill
  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <h2 className="text-xl font-bold mb-4">Skills</h2>

        {/* Conditionally Render Buttons */}
        {props.role === 'user' && (
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setIsPopupOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className={`px-4 py-2 rounded ${isEditing
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
            </button>
          </div>
        )}

      </div>

      {/* Display Skills */}
      <ul className="mb-4 flex flex-wrap gap-6">
        {skills.map((skill, index) => (
          <li key={index} className="flex  items-center mb-2 gap-2 bg-blue-500 px-3 py-1 rounded-[32px]">
            <span className='text-white font-bold text-lg'>{skill}</span>
            {isEditing && (
              <button
                className=" text-white text-xl rounded-[50%] "
                onClick={() => handleDeleteSkill(index)}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}
          </li>
        ))}
      </ul>



      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[300px]">
            <h2 className="text-lg font-bold mb-4">Add Skill</h2>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a skill"
              className="border w-full p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAddSkill}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skill;
