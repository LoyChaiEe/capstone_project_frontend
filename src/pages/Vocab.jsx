import React from "react";
import "./vocab.css";
import { Link } from "react-router-dom";
import GuideModalButton from "../components/GuideModalButton";

export default function Vocab() {
  return (
    <div className="home-container">
      <div className="home-chapter-wrapper">
        <div className="chapter-title-container">
          <div className="chapter-title-wrapper">
            <h1 className="chapter-title">Chapter 1</h1>
            <p className="chapter-title-para">Learning vocabs</p>
          </div>
          <GuideModalButton lesson_id={1} chapter={1} />
        </div>
        <div className="chapter-lesson-wrapper">
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="one"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 1</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="two"
            state={{ type: `vocabs`, lesson_id: 15 }}
          >
            <span className="chapter-lesson">Lesson 2</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="three"
            state={{ type: `vocabs`, lesson_id: 16 }}
          >
            <span className="chapter-lesson">Lesson 3</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="four"
            state={{ type: `vocabs`, lesson_id: 17 }}
          >
            <span className="chapter-lesson">Lesson 4</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="five"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 5</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="six"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 6</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="seven"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 7</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="eight"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 8</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="nine"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 9</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="ten"
            state={{ type: `vocabs`, lesson_id: 14 }}
          >
            <span className="chapter-lesson">Lesson 10</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
