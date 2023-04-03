import React from "react";
import "./home.css";
import UserInfo from "../components/UserInfo";

export default function Home() {
  return (
    <div className="home-section">
      <div className="home-container">
        <span>HOME</span>
        <UserInfo />
        <button>lesson 1</button>
        <button>lesson 2</button>
        <button>lesson 3</button>
      </div>
    </div>
  );
}
