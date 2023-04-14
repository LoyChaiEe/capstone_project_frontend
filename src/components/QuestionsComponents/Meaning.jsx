import React, { useState, useEffect } from "react";
import { MiniCharacter } from "../SVG";
import { Backend_URL } from "../../BACKEND_URL";
import axios from "axios";
import { Button } from "antd";

export default function Meaning(props) {
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [isCorrect, setIsCorrect] = useState();
  const [input, setInput] = useState([]);
  const [userInput, setUserInput] = useState([]); //display the user input answer
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const type = questionData?.question_type.split("-");

  const verify = async () => {
    console.log(userInput);
    const correct = await axios.post(
      `${Backend_URL}/questions/meaning/verify`,
      {
        userInput: userInput,
        questionID: questionData.question_id,
        lessonID: questionData.lesson_id,
      }
    );
    setIsCorrect(correct.data.isCorrect);
  };

  //Verify answer logic
  if (props.hasSubmit) {
    verify();
  }

  //get input
  useEffect(() => {
    axios
      .post(`${Backend_URL}/questions/meaning/input`, {
        wordBank: wordBank,
        type: type,
        answer: questionData.answer,
        difficulty: questionData.difficulty,
      })
      .then((res) => {
        setInput(res.data);
      });
    //reset every question
    setUserInput([]);
    setIsCorrect();
    setIsAnswerSelected(false);
  }, [questionData]);

  const select = (e) => {
    e.preventDefault();
    const text = e.target.textContent;
    const userChoice = [...input];
    const index = userChoice.findIndex(
      (obj) => obj.character === text || obj.meaning === text
    );
    const word = userChoice.splice(index, 1);
    const userAns = [...word];
    setUserInput(userAns);
    setIsAnswerSelected(true);
  };

  const choiceDisplay = input?.map((input) => (
    <Button onClick={select} disabled={props.hasSubmit}>
      {type[1] === "English" ? input.character : input.meaning}
    </Button>
  ));

  console.log("word selected", userInput);

  if (isAnswerSelected === true) {
    props.canSubmit(true);
  } else {
    props.canSubmit(false);
  }

  return (
    <>
      <span>{questionData.question}</span>
      <div style={{ backgroundColor: "orange" }}>{choiceDisplay}</div>
      <div hidden={!props.hasSubmit}>
        You are {isCorrect ? "correct" : "wrong"}
      </div>
    </>
  );
}
