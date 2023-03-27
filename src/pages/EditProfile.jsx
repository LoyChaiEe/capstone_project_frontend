import React, { useState } from "react";
import "./editprofile.css";
// import { storage } from "../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfile() {
  // const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState("")
  // const [updatedProfilePhotoURL, setUpdatedProfilePhotoURL] = useState(url)
  const [currentName, setCurrentName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currrentEmailAddress, setCurrentEmailAddress] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");

  // const handleProfilePhotoChange = async (e) => {
  //   e.preventDefault()
  //   const profilePhotoRef = ref(storage, `${lastName} ${firstName}`);
  //   const photoURL = await uploadBytes(
  //     profilePhotoRef,
  //     updatedProfilePhoto
  //   ).then(() =>
  //     getDownloadURL(profilePhotoRef).then((downloadURL) => {
  //       // console.log(downloadURL);
  //       setUpdatedProfilePhotoURL(downloadURL);
  //       console.log(updatedProfilePhotoURL);
  //       return downloadURL;
  //     })
  //   );
  // }

  return (
    <div className="edit-profile-section">
      <div className="edit-profile-container">
        <div className="edit-profile-image-wrapper">
          <h1 className="edit-profile-title">Edit Profile</h1>
          <img
            src={require("../assets/profile.png")}
            className="edit-profile-image"
            alt="edit-profile-png"
          />
          <button>Change Profile Photo</button>
        </div>
        <div className="edit-profile-info-container">
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Name</h1>
            <input
              className="edit-profile-text-info"
              value={currentName}
              placeholder="Enter name"
              onChange={(e) => {
                setCurrentName(e.target.value);
              }}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Username</h1>
            <input
              className="edit-profile-text-info"
              value={currentUsername}
              placeholder="Enter username"
              onChange={(e) => {
                setCurrentUsername(e.target.value);
              }}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Email Address</h1>
            <input
              className="edit-profile-text-info"
              value={currrentEmailAddress}
              placeholder="Enter email address"
              onChange={(e) => {
                setCurrentEmailAddress(e.target.value);
              }}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Country</h1>
            <input
              className="edit-profile-text-info"
              value={currentCountry}
              placeholder="Enter country"
              onChange={(e) => {
                setCurrentCountry(e.target.value);
              }}
            />
          </div>
          <button>Done</button>
        </div>
      </div>
    </div>
  );
}
