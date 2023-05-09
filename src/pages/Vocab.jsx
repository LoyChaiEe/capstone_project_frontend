import React, { useEffect, useState } from "react";
import "./vocab.css";
import { Link, useOutletContext } from "react-router-dom";
import GuideModalButton from "../components/GuideModalButton";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function Vocab() {
  const [wordBank, setWordBank] = useState([]);
  const [userData] = useOutletContext();
  // const [latestLesson, setLatestLesson] = useState(""); // remove comments please

  useEffect(() => {
    const getUserWordBank = async () => {
      await axios
        .post(`${Backend_URL}/userWordbank/vocabs/${userData?.id}`)
        .then((res) => {
          // backend should return unique wordbank. This request looks exactly like the other one, ideally we write a function to make this kind of request.
          const uniqueArr = res.data.filter((obj, index, self) => {
            return (
              index ===
              self.findIndex((t) => t.character_id === obj.character_id)
            );
          });
          setWordBank(uniqueArr);
        });
    };
    getUserWordBank();
  }, [userData]);

  //get latest lesson // remove comments in production code
  // useEffect(() => {
  //   const getLatestLesson = async () => {
  //     await axios
  //       .get(`${Backend_URL}/userLesson/vocabs/${userData.id}`)
  //       .then((res) => {
  //         setLatestLesson(res.data);
  //       });
  //   };
  //   getLatestLesson();
  // }, []);

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
          {/* Very repetitive code here. We can use a data structure to store the relevant options, and then run a map to generate all the Link tags for us. */}
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="one"
            state={{ type: `vocabs`, lesson_id: 11, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 1</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="two"
            state={{ type: `vocabs`, lesson_id: 2, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 2</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="three"
            state={{ type: `vocabs`, lesson_id: 3, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 3</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="four"
            state={{ type: `vocabs`, lesson_id: 4, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 4</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="five"
            state={{ type: `vocabs`, lesson_id: 5, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 5</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="six"
            state={{ type: `vocabs`, lesson_id: 6, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 6</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="seven"
            state={{ type: `vocabs`, lesson_id: 7, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 7</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="eight"
            state={{ type: `vocabs`, lesson_id: 8, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 8</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="nine"
            state={{ type: `vocabs`, lesson_id: 9, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 9</span>
          </Link>
          <Link
            to="/vocabs/lesson"
            className="chapter-lesson-btn"
            id="ten"
            state={{ type: `vocabs`, lesson_id: 10, wordBank: wordBank }}
          >
            <span className="chapter-lesson">Lesson 10</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
