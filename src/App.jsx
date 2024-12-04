

import { useState } from 'react';
import './App.css'

import Personal from './component/Personal'
import Post from './component/Post'
import UserDetail from './component/UserDetail'


function App() {

  const [profileImage, setProfileImage] = useState('/path-to-default-user-image.png');

  const handleProfileImageChange = (newImage) => {
    setProfileImage(newImage);
  };
  const [profileName, setProfileName] = useState('User Name');

  const handleProfileNameChange = (newName) => {
    setProfileName(newName);
  };


  //  -------------user : visiter---------------
  // const role = 'visiter'
  const role = 'user'


  return (

    <div>
      <Personal role = {role} onProfileImageChange={handleProfileImageChange} onProfileNameChange = {handleProfileNameChange}/>
      <UserDetail role = {role}/>

      <Post userImage = {profileImage} role = {role} userName = {profileName}/>


    </div>
  )
}

export default App
