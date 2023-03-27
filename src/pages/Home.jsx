import React from "react";
import "./home.css";
import UserInfo from "../components/UserInfo";

export default function Home() {
  return (
    <div className="home-section">
      <div className="home-container">
        <span>HOME</span>
        <UserInfo />
      </div>
    </div>
  );
}
