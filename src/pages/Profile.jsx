import React from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-image-wrapper">
          {isAuthenticated ? (
            <img src={user.picture} alt={user.name} className="profile-image" />
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
            value={isAuthenticated ? user.name : "nicholas"}
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Username:</h1>
          <input className="profile-input-box" value={"nicholas"} />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Email Address:</h1>
          <input
            className="profile-input-box"
            value={isAuthenticated ? user.email : "nicklye26@gmail.com"}
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Country:</h1>
          <input className="profile-input-box" value={"singapore"} />
        </div>
        <button>
          <Link to="/edit-profile" className="edit-profile-btn">
            Edit Profile
          </Link>
        </button>
      </div>
    </div>
  );
}
