import React from "react";
import LessonForms from "../components/LessonForms";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import { MiniCharacter } from "../components/SVG";
import { Link } from "react-router-dom";
import useSWR from "swr";
const getter = (url) => axios.get(url).then((res) => res.data);


export default function Lesson() {
  const { data: words, mutate: refetch } = useSWR(
    `${Backend_URL}/characters/vocabs`,
    getter
  );
  return (
    <div className="lesson-section">
      <div className="lesson-container">
        <span>LESSON</span>
        <Link
          to={`vocab/lesson`}
          state={{ type: `vocabs` }}
        >
          <button>Let's learn Vocabs!</button>
        </Link>
      </div>
    </div>
  );
}
