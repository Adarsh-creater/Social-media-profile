import React, { useState } from 'react';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const Achievement = (props) => {
  const [achievements, setAchievements] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingVisible, setIsEditingVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [achievementForm, setAchievementForm] = useState({
    certificate: null,
    title: '',
    description: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAchievementForm({ ...achievementForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setAchievementForm({ ...achievementForm, certificate: e.target.files[0] });
  };

  const handleSave = () => {
    setAchievements([...achievements, achievementForm]);
    setIsAdding(false);
    setAchievementForm({
      certificate: null,
      title: '',
      description: '',
      date: '',
    });
  };

  const handleEditSave = () => {
    const updatedAchievements = [...achievements];
    updatedAchievements[currentEditIndex] = achievementForm;
    setAchievements(updatedAchievements);
    setIsEditing(false);
    setAchievementForm({
      certificate: null,
      title: '',
      description: '',
      date: '',
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setAchievementForm({
      certificate: null,
      title: '',
      description: '',
      date: '',
    });
  };

  const handleDelete = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  const handleEdit = (index) => {
    const achievementToEdit = achievements[index];
    setAchievementForm(achievementToEdit);
    setIsEditing(true);
    setCurrentEditIndex(index);
  };

  return (
    <div className='p-6'>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Achievements</h1>
        {props.role === 'user' && (
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsAdding(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> 
          </button>
          <button
             className={`text-white px-4 py-2 rounded hover:bg-opacity-80 ${
              isEditingVisible ? 'bg-green-500' : 'bg-blue-500'
            }`}
            onClick={() => setIsEditingVisible(!isEditingVisible)}
          >
            {isEditingVisible ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
          </button>
        </div>
         )}
      </div>

      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? 'Edit Achievement' : 'Add Achievement'}
            </h2>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="title"
                value={achievementForm.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                value={achievementForm.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 rounded"
              ></textarea>
              <input
                type="date"
                name="date"
                value={achievementForm.date}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={isEditing ? handleEditSave : handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-gray-500">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded shadow flex items-center gap-4"
          >
            {achievement.certificate && (
              <img
                src={URL.createObjectURL(achievement.certificate)}
                alt="Certificate"
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <p><strong>{achievement.title}</strong></p>
              <p
              style={{
                fontSize: '15px', // Decrease font size
                
              }}
              > 
              <ReactReadMoreReadLess
                  charLimit={80}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                  readMoreStyle={{ whiteSpace: "nowrap",
                    textDecoration: "none",
                    color: "#808080", // Gray color
                    fontWeight: "bold",
                    cursor: "pointer", // Pointer on hover
                     }}
                  readLessStyle={{ 
                    whiteSpace: "nowrap",
          textDecoration: "none",
          color: "#808080", // Gray color
          fontWeight: "bold",
          cursor: "pointer", // Pointer on hover
                   }}
                   >
              {achievement.description}

              </ReactReadMoreReadLess>
              </p>
              <p p className='text-[14px]'>{achievement.date}</p>
            </div>
            {isEditingVisible && (
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(index)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(index)}
                >
                 <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
