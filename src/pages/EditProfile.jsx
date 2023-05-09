import React, { useState, useEffect } from "react";
import "./editprofile.css";
import { Backend_URL } from "../BACKEND_URL";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { EditBtn } from "../components/PNG";
import { Button } from "../components/Buttons";
import { useAuth0 } from "@auth0/auth0-react";
import { notification } from "antd";

const PROFILE_PHOTO_FOLDER = "profile-picture-url";
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function EditProfile() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const [userData, setUserData, setIsUserDataUpdated] = useOutletContext();
  const navigate = useNavigate();
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState("");
  const [updatedPhotoFileUrl, setUpdatedPhotoFileUrl] = useState("");
  const [isChangedPhoto, setIsChangedPhoto] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [voices, setVoices] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentVoice, setCurrentVoice] = useState(1);

  useEffect(() => {
    axios.get(`${Backend_URL}/voicevoxes/`).then((response) => {
      setVoices(response.data);
    });
  }, []);

// I think you could define a function, that acceps input and calls notification.open with that input, instead of repeating yourself here.
  const fieldsAlert = () => {
    notification.open({
      message: `Error`,
      description: "All fields must be filled",
      placement: "topRight",
      duration: 3,
    });
  };

  const photoSuccess = () => {
    notification.open({
      message: "Success",
      description: "Profile photo has been successfully changed",
      placement: "bottomLeft",
      duration: 2,
    });
  };
  const profileSuccess = () => {
    notification.open({
      message: "Success",
      description: "Profile has been successfully edited",
      placement: "bottomLeft",
      duration: 2,
    });
  };

  const handleTextChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
  };

  const handleUpdatedPhoto = (e) => {
    setUpdatedPhotoFile(e.target.files[0]);
    const urlDisplay = URL.createObjectURL(e.target.files[0]);
    setUpdatedPhotoFileUrl(urlDisplay);
    setIsChangedPhoto(true);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    // get access token, redundant comment
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: `${scope}`,
    });
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
      .put(
        `${Backend_URL}/users/photoUrl`,
        {
          profile_pic_url: photoUrl,
          email_address: userData.email_address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setUpdatedPhotoFileUrl(response.data.profile_pic_url);
        setUserData({
          ...userData,
          profile_pic_url: response.data.profile_pic_url,
        });
        setIsUserDataUpdated(true);
        navigate("/profile/user");
        photoSuccess();
      })
      .catch((err) => {
        // maybe add proper handling on the UI as well for errors. Just like you used the notifications on top.
        console.log("Axios profile photo update error", err);
      });
    setProfilePhotoURL("");
    setIsUserDataUpdated(false);
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    // input validation
    if (!currentFirstName || !currentLastName || !currentUsername)
      return fieldsAlert();

    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: `${scope}`,
    });

    await axios
      .put(
        `${Backend_URL}/users/profile`,
        {
          first_name: currentFirstName,
          last_name: currentLastName,
          username: currentUsername,
          email_address: userData.email_address,
          voicevox_id: currentVoice,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setUserData({
          ...userData,
          ...response.data, // maybe rather like so?
        });
        setIsUserDataUpdated(true);
        // I think we could use a single state for this. That would make it way easier to handle all that data and would be safer and more performant in regards to rerenders
        setCurrentFirstName(response.data.first_name);
        setCurrentLastName(response.data.last_name);
        setCurrentUsername(response.data.username);
        setCurrentVoice(response.data.voicevox_id);
        navigate("/profile/user");
        profileSuccess();
      })
      .catch((err) => {
        console.log("Axios profile update error", err);
        setIsProfileUpdated(false);
      });
      // see this here is what I mean. Very inconvenient to constantly having to worry about so many states to update and reset etc.
    setIsProfileUpdated(true);
    setIsUserDataUpdated(false);
    setCurrentFirstName("");
    setCurrentLastName("");
    setCurrentUsername("");
    setCurrentVoice(1);
  };

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
              {/* this variable name is not really descriptive. What is a changed photo? */}
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
            {isChangedPhoto !== false && (
              <Button onClick={handlePhotoSubmit}>Submit</Button>
            )}
          </div>
        </div>
        <div className="edit-profile-info-container">
          {/* If we had a single state for all this currentXXX data, we could dynamically render this list, instead of having to repeat ourselves. */}
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">First Name:</h1>
            <input
              className="edit-profile-text-info"
              name="first_name"
              value={currentFirstName}
              placeholder="Enter name"
              onChange={handleTextChange(setCurrentFirstName)}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Last Name:</h1>
            <input
              className="edit-profile-text-info"
              name="last_name"
              value={currentLastName}
              placeholder="Enter last name"
              onChange={handleTextChange(setCurrentLastName)}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Username:</h1>
            <input
              className="edit-profile-text-info"
              name="username"
              value={currentUsername}
              placeholder="Enter username"
              onChange={handleTextChange(setCurrentUsername)}
            />
          </div>
          <div className="edit-profile-info-wrapper">
            <h1 className="edit-profile-title-info">Waifu Voice:</h1>
            <select
              className="edit-profile-selection-info"
              name="voicevox_id"
              value={currentVoice}
              onChange={handleTextChange(setCurrentVoice)}
            >
              {voices &&
                voices.map((voice, index) => (
                  <option value={voice.id} key={index}>
                    {voice.voicevox_character}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Button onClick={handleProfileChange}>Done</Button>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
