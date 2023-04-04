import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="home-section">
      <div className="home-container">
        <div className="home-chapter-wrapper">
          <div className="chapter-title-wrapper">
            <h1>Chapter 1</h1>
            <p>Learning vocabs</p>
          </div>
          <div className="chapter-lesson-wrapper">
            <div className="chapter-lesson">
              <span>Lesson 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
