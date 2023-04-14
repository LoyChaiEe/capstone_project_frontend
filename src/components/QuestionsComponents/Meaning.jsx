import React, { useState, useEffect } from "react";
import { MiniCharacter } from "../SVG";
import { Backend_URL } from "../../BACKEND_URL";
import axios from "axios";
// import Button from "../Button";
import { Button } from "antd";
import "./meaning.css";

export default function Meaning(props) {
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [wordArray, setWordArray] = useState([]);
  const [wordSelected, setWordSelected] = useState("");
  const type = questionData?.question_type.split("-");

  // to display 4 words in an array
  useEffect(() => {
    axios
      .post(`${Backend_URL}/questions/meaning/words`, {
        wordBank: wordBank,
        type: type,
        answer: questionData.answer,
      })
      .then((res) => {
        setWordArray(res.data);
      });
    // resets array after every question
    setWordArray([]);
  }, []);

  // user selects word
  const select = (e) => {
    e.preventDefault();
    const selected = e.target.textContent;
    setWordSelected(selected);
  };

  const wordArrayDisplay = wordArray.map((wordArray) => (
    <Button onClick={select}>{wordArray.character}</Button>
  ));

  if (wordArray.length !== 0) {
    props.canSubmit(true);
  } else {
    props.canSubmit(false);
  }

  return (
    <>
      <span>{questionData.question}</span>
      <div>{wordSelected}</div>
      <div>{wordArrayDisplay}</div>
    </>
  );
}
