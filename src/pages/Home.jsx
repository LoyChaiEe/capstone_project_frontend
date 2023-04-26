import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import GuideModalButton from "../components/GuideModalButton";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-chapter-wrapper">
        <div className="chapter-title-container">
          <div className="chapter-title-wrapper">
            <h1 className="chapter-title">Chapter 1</h1>
            <p className="chapter-title-para">Learning vocabs</p>
          </div>
          <GuideModalButton />
        </div>
        <div className="chapter-lesson-wrapper">
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="one"
            state={{ type: `vocabs` }}
          >
            <span className="chapter-lesson">Lesson 1</span>
          </Link>
          <Link className="chapter-lesson-btn" id="two">
            <span className="chapter-lesson">Lesson 2</span>
          </Link>
          <Link className="chapter-lesson-btn" id="three">
            <span className="chapter-lesson">Lesson 3</span>
          </Link>
        </div>
      </div>

      <div className="home-chapter-wrapper">
        <div className="chapter-title-container">
          <div className="chapter-title-wrapper">
            <h1 className="chapter-title">Chapter 2</h1>
            <p className="chapter-title-para">Learning vocabs</p>
          </div>
          <GuideModalButton />
        </div>
        <div className="chapter-lesson-wrapper">
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="one"
            state={{ type: `vocabs` }}
          >
            <span className="chapter-lesson">Lesson 1</span>
          </Link>
          <Link className="chapter-lesson-btn" id="two">
            <span className="chapter-lesson">Lesson 2</span>
          </Link>
          <Link className="chapter-lesson-btn" id="three">
            <span className="chapter-lesson">Lesson 3</span>
          </Link>
        </div>
      </div>

      <div className="home-chapter-wrapper">
        <div className="chapter-title-container">
          <div className="chapter-title-wrapper">
            <h1 className="chapter-title">Chapter 3</h1>
            <p className="chapter-title-para">Learning vocabs</p>
          </div>
          <GuideModalButton />
        </div>
        <div className="chapter-lesson-wrapper">
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="one"
            state={{ type: `vocabs` }}
          >
            <span className="chapter-lesson">Lesson 1</span>
          </Link>
          <Link className="chapter-lesson-btn" id="two">
            <span className="chapter-lesson">Lesson 2</span>
          </Link>
          <Link className="chapter-lesson-btn" id="three">
            <span className="chapter-lesson">Lesson 3</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
