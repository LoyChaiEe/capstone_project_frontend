import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import useSWR from "swr";
import { BACKEND_URL } from "../constants";
import { Link } from "react-router-dom";
import "./spinner.css";
const getter = (url) => axios.get(url).then((res) => res.data);

export default function Characters() {
  const [characterType, setCharacterType] = useState("hiragana")
  const { data: characters, mutate: refetch } = useSWR(`${BACKEND_URL}/characters/${characterType}`, getter);
  const changeLesson = (type) => {
    setCharacterType(type)
    refetch()
  }
  //Basic loading spinner
  if (!characters) {
    return (
      <div>
        <div className="spinner"></div>
        Loading data...
      </div>
    );
  }
  const ele = characters.map(x => <button>{x.character}</button>)
  console.log(characters, characterType)
  return (
    <div className="character-section">
      <div className="character-container">
        <button onClick={() => {changeLesson("hiragana")}}>Hiragana</button>
        <button onClick={() => {changeLesson("katakana")}}>katkana</button>
      </div>
      <div className="character-container">
        {ele}
      </div>
      <div>
        <Link to="/test" state={{ msg: `IM LEARNING ${characterType}` }}>
         Start {characterType} Lesson
        </Link>
      </div>
    </div>
  );
}
