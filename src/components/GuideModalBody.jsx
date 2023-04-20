import React, { useEffect, useState } from "react";
import "./guideModalBody.css";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function GuideModalBody() {
  const [lessonWords, setLessonWords] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${Backend_URL}/LQA/lesson/words/${1}`).then((res) => {
        setLessonWords(res.data);
      });
    } catch (err) {
      console.log("ERR", err);
    }
  }, []);

  console.log(lessonWords);

  return (
    <div>
      <h1>Words in Lesson 1!</h1>
      {lessonWords.map((words, index) => {
        return <div key={index}>{words.character.character}</div>;
      })}
    </div>
  );
}
