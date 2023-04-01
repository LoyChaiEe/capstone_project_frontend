import React, { useEffect, useState } from "react";
import "./editprofile.css";
import { Backend_URL } from "../BACKEND_URL";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const PROFILE_PHOTO_FOLDER = "profile-picture-url";

export default function EditProfile() {
  // const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState("")
  // const [updatedProfilePhotoURL, setUpdatedProfilePhotoURL] = useState(url)
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currrentEmailAddress, setCurrentEmailAddress] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState("");
  const [updatedPhotoFileUrl, setUpdatedPhotoFileUrl] = useState("");

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

  useEffect(() => {
    const retrieveUserInfo = async () => {
      await axios
        .get(`${Backend_URL}/users/${user?.email}`)
        .then((response) => {
          setCurrentUser(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log("2nd error", err);
        });
    };
    retrieveUserInfo();
  }, [user?.email]);

  const handleUpdatedPhoto = (e) => {
    setUpdatedPhotoFile(e.target.files[0]);
    const urlDisplay = URL.createObjectURL(e.target.files[0]);
    setUpdatedPhotoFileUrl(urlDisplay);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    const profilePhotoRef = ref(
      storage,
      `${PROFILE_PHOTO_FOLDER}/${updatedPhotoFile.name}`
    );
    const photoUrl = await uploadBytes(profilePhotoRef, updatedPhotoFile).then(
      () =>
        getDownloadURL(profilePhotoRef).then((downloadUrl) => {
          setProfilePhotoUrl(downloadUrl);
          return downloadUrl;
        })
    );
    await axios
      .put(`${Backend_URL}/users/photoUrl`, {
        photoUrl: `${photoUrl}`,
        email: `${currentUser}`,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    alert("Profile photo has been successfully uploaded!");
  };

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
          <div>
            <p>Change Profile Photo</p>
            <input
              type="file"
              className="hidden"
              onChange={handleUpdatedPhoto}
            />
            <button onClick={handlePhotoSubmit}>press</button>
          </div>
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
