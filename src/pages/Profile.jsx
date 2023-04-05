import React, { useContext, useEffect } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/userContex";

export default function ProfileComponent() {
  const { isAuthenticated, logout } = useAuth0();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    console.log("hi 1", userData);
    setUserData(userData);
    console.log("hi 2");
  }, [userData]);

  const LogoutButton = () => {
    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    );
  };
  if (!userData.email_address) return null;

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-image-wrapper">
          {isAuthenticated ? (
            <img
              src={userData.profile_pic_url}
              alt={userData.profile_pic_url}
              className="profile-image"
            />
          ) : (
            <img
              src={require("../assets/profile.png")}
              className="profile-image"
              alt="profile-pic"
            />
          )}
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Name:</h1>
          <input
            className="profile-input-box"
            value={
              isAuthenticated
                ? `${userData.first_name} ${userData.last_name}`
                : ""
            }
            readOnly
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Username:</h1>
          <input
            className="profile-input-box"
            value={isAuthenticated ? userData.username : ""}
            readOnly
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Email Address:</h1>
          <input
            className="profile-input-box"
            value={isAuthenticated ? userData.email_address : ""}
            readOnly
          />
        </div>
        <div className="edit-profile-btn-wrapper">
          <Link
            to="/profile/edit"
            className="edit-profile-btn"
            lastName={userData.last_name}
          >
            Edit Profile
          </Link>
        </div>
        {LogoutButton()}
      </div>
    </div>
  );
}
