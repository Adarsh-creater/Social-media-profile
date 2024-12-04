import React, { useState } from 'react';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

const Experience = (props) => {
  const [experiences, setExperiences] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingVisible, setIsEditingVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    logo: null,
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm({ ...experienceForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setExperienceForm({ ...experienceForm, logo: e.target.files[0] });
  };

  const handleSave = () => {
    setExperiences([...experiences, experienceForm]);
    setIsAdding(false);
    setExperienceForm({
      logo: null,
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleEditSave = () => {
    const updatedExperiences = [...experiences];
    updatedExperiences[currentEditIndex] = experienceForm;
    setExperiences(updatedExperiences);
    setIsEditing(false);
    setExperienceForm({
      logo: null,
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setExperienceForm({
      logo: null,
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleDelete = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleEdit = (index) => {
    const experienceToEdit = experiences[index];
    setExperienceForm(experienceToEdit);
    setIsEditing(true);
    setCurrentEditIndex(index);
  };

  return (
    <div className='p-6'>
      <div className="flex justify-between items-center">
        <strong className="text-xl font-bold mb-4">Experience</strong>
        {props.role === 'user' && (

          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setIsAdding(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className={`text-white px-4 py-2 rounded hover:bg-opacity-80 ${isEditingVisible ? 'bg-green-500' : 'bg-blue-500'
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
              {isEditing ? 'Edit Experience' : 'Add Experience'}
            </h2>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="companyName"
                value={experienceForm.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="role"
                value={experienceForm.role}
                onChange={handleInputChange}
                placeholder="Role"
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="startDate"
                value={experienceForm.startDate}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="endDate"
                value={experienceForm.endDate}
                onChange={handleInputChange}
                placeholder="End Date (optional)"
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                value={experienceForm.description}
                onChange={handleInputChange}
                placeholder="Description (optional)"
                className="border p-2 rounded"
              ></textarea>
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

      <div className="mt-6">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded shadow flex items-center gap-4 text-gray-500"
          >
            {experience.logo && (
              <img
                src={URL.createObjectURL(experience.logo)}
                alt="Company Logo"
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <p> <strong>{experience.companyName}</strong></p>
              <p className='text-[14px]'> {experience.role}</p>
              <p className='text-[14px]'> <span>{experience.startDate}</span> - <span>{experience.endDate || 'Present'}</span></p>

              {experience.description && (
                <p
                style={{
                  fontSize: '15px', // Decrease font size
                  
                }}
                >
                  <ReactReadMoreReadLess
                    charLimit={80}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                    readMoreStyle={{
                      whiteSpace: "nowrap",
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

                    {experience.description}
                  </ReactReadMoreReadLess>
                </p>
              )}
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

export default Experience;

