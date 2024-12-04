import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

const Education = (props) => {
  const [educationList, setEducationList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    marks: '',
    logo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewEducation({ ...newEducation, logo: e.target.files[0] });
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // Edit existing entry
      const updatedList = [...educationList];
      updatedList[editIndex] = newEducation;
      setEducationList(updatedList);
      setEditIndex(null);
    } else {
      // Add new entry
      setEducationList([...educationList, newEducation]);
    }
    setIsAdding(false);
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      marks: '',
      logo: null,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditIndex(null);
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      marks: '',
      logo: null,
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewEducation(educationList[index]);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  return (
    <div className='p-6'>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Education</h1>
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
              isEditing ? 'bg-green-500' : 'bg-blue-500'
            }`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
          </button>
        </div>
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">
              {editIndex !== null ? 'Edit Education' : 'Add Education'}
            </h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="institution"
                value={newEducation.institution}
                onChange={handleInputChange}
                placeholder="Institution"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                placeholder="Degree"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={handleInputChange}
                placeholder="Field of Study (optional)"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="startYear"
                value={newEducation.startYear}
                onChange={handleInputChange}
                placeholder="Start Year"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="endYear"
                value={newEducation.endYear}
                onChange={handleInputChange}
                placeholder="End Year (optional)"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="marks"
                value={newEducation.marks}
                onChange={handleInputChange}
                placeholder="Marks/Percentage"
                className="border p-2 rounded"
              />
              <input
                type="file"
                onChange={handleFileChange}
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
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-gray-500">
        {educationList
          .sort((a, b) => b.startYear - a.startYear)
          .map((education, index) => (
            <div
              key={index}
              className="mb-4 border p-4 rounded shadow flex items-center gap-4"
            >
              {education.logo && (
                <img
                  src={URL.createObjectURL(education.logo)}
                  alt={`${education.institution} logo`}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p> <strong>{education.institution}</strong></p>
                <p className='text-[15px]'> {education.degree} 
                {education.fieldOfStudy && (
                  <span> ( {education.fieldOfStudy} )</span>
                )}
                </p>
                <p className='text-[15px]'><span>{education.startYear}</span> - <span>{education.endYear || 'Present'}</span></p>
                
                <p  className='text-[15px]'>{education.marks}</p>
              </div>
              {isEditing && (
                <div className="flex gap-4">
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

export default Education;
