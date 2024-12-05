import React, { useState } from 'react';
import img from '../assets/image/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

const Personal = (props) => {
  const [profile, setProfile] = useState({
    firstName: 'First Name',
    lastName: 'Last Name',
    headline: 'Headline',
    country: 'Country',
    city: 'City',
    state: 'State',
    email: 'example@domain.com',
    dob: '2001-01-01', // Default value for date input
    phone: '1234567890',
  });

  props.onProfileNameChange(profile.firstName + " " + profile.lastName);
  props.onProfileImageChange(img);

  const [isEditing, setIsEditing] = useState(false);
  const [isContactInfoVisible, setIsContactInfoVisible] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [isFollowing, setIsFollowing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure phone number is at most 10 characters
    if (name === 'phone' && value.length > 10) return;

    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-2 text-gray-500">
        <img
          src={img}
          alt="profile"
          className="w-[170px] h-[170px] rounded-full object-cover"
        />
        {props.role === 'user' && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between text-gray-500">
        <div>
          <div className="text-black font-bold text-lg">
            <span>{profile.firstName} </span>
            <span>{profile.lastName}</span>
          </div>
          <div>{profile.headline}</div>
          <div>
            <p>
              {profile.country} {profile.city}, {profile.state}
            </p>
          </div>
        </div>
        <div>
          <div>
            <span>Follow : 150</span> <br /> Following : 200
          </div>
        </div>
      </div>

      <div>
        <div
          className="text-blue-600 underline cursor-pointer"
          onClick={() => setIsContactInfoVisible(true)}
        >
          Contact info.
        </div>

        {props.role === 'visitor' && (
          <div className="flex gap-2 my-4">
            <button
              className={`px-4 py-2 rounded-[50px] transition-all duration-300 ${
                isFollowing
                  ? 'bg-white text-black border border-black hover:bg-gray-200'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-[50px] hover:bg-blue-600">
              Message
            </button>
          </div>
        )}
      </div>

      {/* Popup Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="firstName"
                value={tempProfile.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                value={tempProfile.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="headline"
                value={tempProfile.headline}
                onChange={handleInputChange}
                placeholder="Headline"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="country"
                value={tempProfile.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="city"
                value={tempProfile.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="state"
                value={tempProfile.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={tempProfile.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="dob"
                value={tempProfile.dob}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="phone"
                value={tempProfile.phone}
                onChange={handleInputChange}
                placeholder="Phone"
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

      {/* Contact Info Popup */}
      {isContactInfoVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-gray-500">
          <div className="bg-white p-4 rounded shadow-lg w-[300px] space-y-4">
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            <p>
              <strong>Email:</strong> <span>{profile.email}</span>
            </p>
            <p>
              <strong>DOB:</strong> <span>{profile.dob}</span>
            </p>
            <p>
              <strong>Phone:</strong> <span>{profile.phone}</span>
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => setIsContactInfoVisible(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;
