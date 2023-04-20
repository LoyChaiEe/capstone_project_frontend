import React, { useState, useEffect } from "react";
import "./editprofile.css";
import { Backend_URL } from "../BACKEND_URL";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { EditBtn } from "../components/PNG";
import { Button } from "../components/Buttons";

const PROFILE_PHOTO_FOLDER = "profile-picture-url";

export default function EditProfile() {
  const [userData, setUserData, setIsUserDataUpdated] = useOutletContext();
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState("");
  const [updatedPhotoFileUrl, setUpdatedPhotoFileUrl] = useState("");
  const [isChangedPhoto, setIsChangedPhoto] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [voices, setVoices] = useState("");
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    axios.get(`${Backend_URL}/voicevoxes/`).then((response) => {
      setVoices(response.data);
    });
  }, []);

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setTextInput({
      ...textInput,
      [name]: value,
    });
  };

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
        setUpdatedPhotoFileUrl(response.data.profile_pic_url);
        setUserData({
          ...userData,
          profile_pic_url: response.data.profile_pic_url,
        });
        setIsUserDataUpdated(true);
      })
      .catch((err) => {
        console.log("Axios profile photo update error", err);
      });
    alert("Profile photo has been successfully uploaded!");
    setProfilePhotoURL("");
    setIsUserDataUpdated(false);
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    // input validation
    // if (!currentLastName || !currentUsername)
    //   return alert("All fields have to be filled");

    await axios
      .put(`${Backend_URL}/users/profile`, {
        first_name: textInput.first_name,
        last_name: textInput.last_name,
        username: textInput.username,
        email_address: userData.email_address,
        voicevox_id: textInput.voicevox_id,
      })
      .then((response) => {
        setUserData({
          ...userData,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
          voicevox_id: response.data.voicevox_id,
        });
        setIsUserDataUpdated(true);
      })
      .catch((err) => {
        console.log("Axios profile update error", err);
        setIsProfileUpdated(false);
      });
    setIsProfileUpdated(true);
    setIsUserDataUpdated(false);
  };

  console.log(voices);

  return (
    <>
      <div className="edit-profile-container">
        <div className="edit-profile-image-wrapper">
          <h1 className="edit-profile-title">Edit Profile</h1>
          <div className="profile-photo-submit">
            <label className="custom-file-upload">
              <div className="custom-file-edit">
                <EditBtn />
              </div>
              {isChangedPhoto === false ? (
                <img
                  src={userData?.profile_pic_url}
                  alt={userData?.profile_pic_url}
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
            <Button onClick={handlePhotoSubmit}>Submit</Button>
          </div>
        </div>
        <div className="edit-profile-info-container">
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">First Name:</h1>
            <input
              className="edit-profile-text-info"
              name="first_name"
              value={textInput.first_name}
              placeholder="Enter name"
              onChange={handleTextInputChange}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Last Name:</h1>
            <input
              className="edit-profile-text-info"
              name="last_name"
              value={textInput.last_name}
              placeholder="Enter last name"
              onChange={handleTextInputChange}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Username:</h1>
            <input
              className="edit-profile-text-info"
              name="username"
              value={textInput.username}
              placeholder="Enter username"
              onChange={handleTextInputChange}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Waifu Voice:</h1>
            <select
              className="profile-input-box"
              name="voicevox_id"
              value={textInput.voicevox_id}
              onChange={handleTextInputChange}
            >
              {voices &&
                voices.map((voice, index) => (
                  <option value={voice.id} key={index}>
                    {voice.voicevox_character}
                  </option>
                ))}
            </select>
          </div>
          <Link to="/profile/user">
            <Button onClick={handleProfileChange}>Done</Button>
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
