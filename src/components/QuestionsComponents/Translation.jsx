import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../SVG";
import axios from "axios";
import useSWR from "swr"
import { Button } from "antd";
import { Backend_URL } from "../../BACKEND_URL";

export default function Translation(props) {
  const questionData = props.questionData
  const wordBank = props.wordBank
  const [input, setInput] = useState([])
  const [userInput, setUserInput] = useState([]) //display the user input answer
  useEffect(() => {
    axios.post(`${Backend_URL}/questions/translation/input`, {
      wordBank: wordBank,
      type: questionData.type.split("-"),
      answer: questionData,
      difficulty: questionData.difficulty
    }).then((res) => {
      setInput(res.data.data)
    })
  },[])
  

  const add = (e) => {
    e.preventDefault()
    const text = e.target.textContent;
    const userChoice = [...input];
    const index = userChoice.findIndex((obj) => obj.character === text);
    const word = userChoice.splice(index, 1);
    const userAns = [...userInput, ...word];
    setUserInput(userAns);
    setInput(userChoice);
  };

  const remove = (e) => {
    e.preventDefault();
    const text = e.target.textContent;
    const userAns = [...userInput];
    const index = userAns.findIndex((obj) => obj.character === text);
    const word = userAns.splice(index, 1);
    const userChoice = [...input, ...word];
    setUserInput(userAns);
    setInput(userChoice);
  };
  const choiceDisplay = input?.map((input) => (
    <Button onClick={add}>{input.character}</Button>
  ));
  const displayAnswer = userInput?.map((input) => (
    <Button style={{backgroundColor: "green"}}onClick={remove}>{input.character}</Button>
  ));

  if(displayAnswer.length !== 0){
    props.canSubmit(true);
  }
  else{
    props.canSubmit(false)
  }
  console.log(questionData);
   return (
     <>
       <div style={{ backgroundColor: "orange" }}>
         <MiniCharacter />
         <span>{questionData.question}</span>
       </div>
       {displayAnswer}
       <div style={{ backgroundColor: "orange" }}>{choiceDisplay}</div>
     </>
   );
}
