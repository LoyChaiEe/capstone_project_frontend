import React from "react";
import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-image-wrapper">
          <img
            src={require("../assets/profile.png")}
            className="profile-image"
            alt="profile-pic"
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Name:</h1>
          <input className="profile-input-box" value={"nicholas"} />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Username:</h1>
          <input className="profile-input-box" value={"nicholas"} />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Email Address:</h1>
          <input className="profile-input-box" value={"nicholas@gmail.com"} />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Country:</h1>
          <input className="profile-input-box" value={"singapore"} />
        </div>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}
