import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function Characters() {
  const [words, setWords] = useState({});

  useEffect(() => {
    const getWords = async () => {
      try {
        const characters = await axios.get(`${Backend_URL}/words`);
        setWords(characters);
      } catch (error) {
        console.log("error", error);
      }
    };
    getWords();
  }, []);

  useEffect(() => {
    const wordsData = words.data;
    if (wordsData !== undefined) {
      wordsData.map((i) => {
        return console.log("wordsData", i.character);
      });
    }
  });

  return (
    <div className="character-section">
      <div className="character-container">
        <span>CHARACTERS</span>
      </div>
    </div>
  );
}
