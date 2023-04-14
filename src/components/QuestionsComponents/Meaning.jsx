import React, { useState, useEffect } from "react";
import { MiniCharacter } from "../SVG";
import { Backend_URL } from "../../BACKEND_URL";
import axios from "axios";
import Button from "../Button";
// import { Button } from "antd";
import "./meaning.css";

export default function Meaning(props) {
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [wordArray, setWordArray] = useState([]);
  const [wordSelected, setWordSelected] = useState("");
  const [isWordSelected, setIsWordSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [prevSelectedButton, setPrevSelectedButton] = useState(null);
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
    // resets array after every question, refreshes according to questionData
    setWordArray([]);
    setWordSelected("");
    setIsWordSelected(false);
    setIsCorrect();
    setPrevSelectedButton(null);
  }, [questionData]);

  // user selects word
  const select = (e) => {
    e.preventDefault();
    if (prevSelectedButton) {
      prevSelectedButton.classList.remove("selected");
    }

    const selectedButton = e.target;
    selectedButton.classList.add("selected");
    const selected = selectedButton.textContent;
    setWordSelected(selected);
    setIsWordSelected(true);
    setPrevSelectedButton(selectedButton);
  };

  const verifyAnswer = async () => {
    const answer = await axios.post(`${Backend_URL}/questions/meaning/verify`, {
      userInput: wordSelected,
      questionID: questionData.question_id,
      lessonID: questionData.lesson_id,
    });
    setIsCorrect(answer.data.isCorrect);
  };

  const wordArrayDisplay = wordArray.map((wordArray) => (
    <Button onClick={select} disabled={props.hasSubmit}>
      {type[1] === "English" ? wordArray.character : wordArray.meaning}
    </Button>
  ));

  // enable or disable submit button
  if (isWordSelected === true) {
    props.canSubmit(true);
  } else {
    props.canSubmit(false);
  }

  // call verifyAnswer function upon submit
  if (props.hasSubmit) {
    verifyAnswer();
  }

  return (
    <>
      <span>{questionData.question}</span>
      <div>{wordArrayDisplay}</div>
      <div hidden={!props.hasSubmit}>
        You are {isCorrect ? "correct" : "wrong"}
      </div>
    </>
  );
}
