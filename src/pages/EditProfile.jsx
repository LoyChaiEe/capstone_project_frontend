import React, { useEffect, useState, useContext } from "react";
import "./editprofile.css";
import { Backend_URL } from "../BACKEND_URL";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { Link, Outlet, useOutletContext } from "react-router-dom";

const PROFILE_PHOTO_FOLDER = "profile-picture-url";

export default function EditProfile() {
  const [userData, setUserData] = useOutletContext();
  const [currentUser, setCurrentUser] = useState({});
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState("");
  const [updatedPhotoFileUrl, setUpdatedPhotoFileUrl] = useState("");
  const [isChangedPhoto, setIsChangedPhoto] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  const handleUpdatedPhoto = (e) => {
    setUpdatedPhotoFile(e.target.files[0]);
    const urlDisplay = URL.createObjectURL(e.target.files[0]);
    setUpdatedPhotoFileUrl(urlDisplay);
    setIsChangedPhoto(true);
  };

  const handlePhotoSubmit = async (e) => {
    const profilePhotoRef = ref(
      storage,
      `${PROFILE_PHOTO_FOLDER}/${updatedPhotoFile.name}`
    );
    const photoUrl = await uploadBytes(profilePhotoRef, updatedPhotoFile).then(
      () =>
        getDownloadURL(profilePhotoRef).then((downloadUrl) => {
          setProfilePhotoURL(downloadUrl);
          return downloadUrl;
        })
    );
    await axios
      .put(`${Backend_URL}/users/photoUrl`, {
        profile_pic_url: photoUrl,
        email_address: userData.email_address,
      })
      .then((response) => {
        console.log("1");
        setUpdatedPhotoFileUrl(response.data.profile_pic_url);
        setUserData({
          ...userData,
          profile_pic_url: response.data.profile_pic_url,
        });
        console.log("2", response.data.profile_pic_url);
      })
      .catch((err) => {
        console.log("error", err);
      });
    alert("Profile photo has been successfully uploaded!");
    setProfilePhotoURL("");
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    await axios
      .put(`${Backend_URL}/users/profile`, {
        first_name: currentFirstName,
        last_name: currentLastName,
        username: currentUsername,
        email_address: userData.email_address,
      })
      .then((response) => {
        console.log(response.data);
        setCurrentFirstName(response.data.first_name);
        setCurrentLastName(response.data.last_name);
        setCurrentUsername(response.data.username);
        setUserData({
          ...userData,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsProfileUpdated(false);
      });
    alert("Profile has been successfully updated!");
    setIsProfileUpdated(true);
    setCurrentFirstName("");
    setCurrentLastName("");
    setCurrentUsername("");
  };

  return (
    <>
      <div className="edit-profile-section">
        <div className="edit-profile-container">
          <div className="edit-profile-image-wrapper">
            <h1 className="edit-profile-title">Edit Profile</h1>
            <div className="profile-photo-submit">
              <label className="custom-file-upload">
                {isChangedPhoto === false ? (
                  <img
                    src={currentUser?.profile_pic_url}
                    alt={currentUser?.profile_pic_url}
                    className="edit-profile-image"
                  />
                ) : (
                  <img
                    src={updatedPhotoFileUrl}
                    alt={updatedPhotoFileUrl}
                    className="edit-profile-image"
                  />
                )}
                <input
                  className="file-input"
                  type="file"
                  onChange={handleUpdatedPhoto}
                />
              </label>
              <button onClick={handlePhotoSubmit}>Submit</button>
            </div>
          </div>
          <div className="edit-profile-info-container">
            <div className="edit-profile-info-wrapper">
              <h1 className="edit-profile-title-info">First Name</h1>
              <input
                className="edit-profile-text-info"
                value={currentFirstName}
                placeholder="Enter name"
                onChange={(e) => {
                  setCurrentFirstName(e.target.value);
                }}
              />
            </div>
            <div className="edit-profile-info-wrapper">
              <h1 className="edit-profile-title-info">Last Name</h1>
              <input
                className="edit-profile-text-info"
                value={currentLastName}
                placeholder="Enter last name"
                onChange={(e) => {
                  setCurrentLastName(e.target.value);
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
            <button onClick={handleProfileChange}>Done</button>
            {isProfileUpdated === true ? (
              <button>
                <Link to="/">Back</Link>
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
