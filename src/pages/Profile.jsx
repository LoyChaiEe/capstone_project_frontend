import React from "react";
import "./profile.css";
import { Link, useOutletContext } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutButton from "../components/LogOutButton";
import SettingsButton from "../components/SettingsButton";

export default function ProfileComponent() {
  const { isAuthenticated } = useAuth0();
  const [userData] = useOutletContext();

  if (!userData?.email_address) return null;

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-image-wrapper">
          <h1 className="profile-title">Profile</h1>
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
        <div className="profile-info-container">
          <div className="profile-info-wrapper">
            <h1 className="profile-info">Name:</h1>
            <p className="profile-input-box">
              {isAuthenticated
                ? `${userData.first_name} ${userData.last_name}`
                : ""}
            </p>
          </div>
          <div className="profile-info-wrapper">
            <h1 className="profile-info">Username:</h1>
            <p className="profile-input-box">
              {isAuthenticated ? userData.username : ""}
            </p>
          </div>
          <div className="profile-info-wrapper">
            <h1 className="profile-info">Email Address:</h1>
            <p className="profile-input-box">
              {isAuthenticated ? userData.email_address : ""}
            </p>
          </div>
        </div>
        <div className="profile-settings-wrapper">
          <SettingsButton />
          <LogOutButton />
        </div>
      </div>
    </div>
  );
}
