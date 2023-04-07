import React, { useState, useEffect } from "react";
import { MiniCharacter } from "../SVG";
import { Button } from "antd";
import { Howl } from "howler";
import "./recognition.css";

const soundPlay = (src) => {
  const sound = new Howl({
    src,
    html5: true,
    preload: true,
  });
  sound.play();
};

export default function Recognition(props) {
  const [selected, setSelected] = useState(-1) // set as -ve int when initialised
  const [input, setInput] = useState([])
  const [inputDisplay, setInputDisplay] = useState([])
  const questionData = props.questionData
  const wordBank = props.wordBank
  let type = questionData[0].question.type.split("-");
  const word = (
    <div className="recognition-display" onClick={() => soundPlay(questionData[0].character.audio_url)}>
      {/*the type is not the best way to filter out but will make do based on database*/}
        {type[1] === "character"
          ? questionData[0].character.character
          : questionData[0].character.pronounciation}
    </div>
  );
  useEffect(() => {
    setInput(randomizedInput(wordBank, type[1], questionData[0].character));
  }, [wordBank, questionData]);

  useEffect(() => {
    setInputDisplay((
      input.map((input) => (
        <Button onClick={() => select(input.audio_url, input.id)}>
          {type === "character" ? input.pronounciation : input.character}
        </Button>
      ))
    ))
  }, [input])
  // //Randomized inputs with the correct answer as  one of them
  // const input = randomizedInput(wordBank, type[1], questionData[0].character);
  // const inputDisplay = input.map(input => <Button onClick={()=> select(input.audio_url,  input.id)}>{type === "character"? input.pronounciation : input.character}</Button>)
  console.log()
  const select = (src, id) => {
    soundPlay(src)
    setSelected(id)
  }
  //Question display
  let question = questionData[0].question.question;
  const index = question.indexOf(":");
  if (index !== -1) {
    question = question.slice(0, index + 1); 
  }

  return (
    <>
      <div>
        <MiniCharacter />
        {question}
        {word}
      </div>
      <div>
        {inputDisplay}
      </div>
      <button onClick={() => props.canSubmit(true)}>disable/enable</button>
    </>
  );
}

function randomizedInput(wordBank, type, answer){
  let input = [];
  //filter the answer out
  const wrongInput = wordBank.filter((ele) => ele.character.id !== answer.id)
  while (input.length < 3) {
    const random = Math.floor(Math.random() * wrongInput.length);
    if (!input.includes(wrongInput[random].character)) {
      input.push(wrongInput[random].character);
    }
  }
  const rand = Math.floor(Math.random()*3)
  input.splice(rand, 0, answer);
  return input
}


