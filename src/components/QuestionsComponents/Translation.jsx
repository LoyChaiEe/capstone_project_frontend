import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../SVG";
import axios from "axios";
import useSWR from "swr";
import { Button } from "antd";
import { Backend_URL } from "../../BACKEND_URL";
import { useOutletContext } from "react-router-dom";
import { Howl } from "howler";

export default function Translation(props) {
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [userData] = useOutletContext();
  const [input, setInput] = useState([]);
  const [userInput, setUserInput] = useState([]); //display the user input answer
  const [isCorrect, setIsCorrect] = useState();
  const type = questionData?.question_type.split("-");

  const speaker = userData.voicevox_id;
  const play = async (e) => {
    const questionPhrase = questionData.question;
    const startIndex = questionPhrase.indexOf(":") + 1;
    const text = questionPhrase.slice(startIndex);
    const data = await createAudio(text);
    const audioSRC = URL.createObjectURL(data);
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 2,
      format: "wav",
    });
    sound.play();
  };

  const createQuery = async (text) => {
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=${speaker}&text=${text}`
    );
    return response.data;
  };

  const createVoice = async (text) => {
    const query = await createQuery(text);
    const response = await axios.post(
      `http://localhost:50021/synthesis?speaker=${speaker}`,
      query,
      { responseType: "blob" }
    );
    return response.data;
  };

  const createAudio = async (text) => {
    const data = await createVoice(text);
    return data;
  };

  const verify = async () => {
    console.log(userInput);
    const correct = await axios.post(
      `${Backend_URL}/questions/translation/verify`,
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
      .post(`${Backend_URL}/questions/translation/input`, {
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
  }, [questionData]);

  const add = (e) => {
    e.preventDefault();
    const text = e.target.textContent;
    const userChoice = [...input];
    const index = userChoice.findIndex(
      (obj) => obj.character === text || obj.meaning === text
    );
    const word = userChoice.splice(index, 1);
    const userAns = [...userInput, ...word];
    setUserInput(userAns);
    setInput(userChoice);
  };

  const remove = (e) => {
    e.preventDefault();
    const text = e.target.textContent;
    const userAns = [...userInput];
    const index = userAns.findIndex(
      (obj) => obj.character === text || obj.meaning === text
    );
    const word = userAns.splice(index, 1);
    const userChoice = [...input, ...word];
    setUserInput(userAns);
    setInput(userChoice);
  };
  const choiceDisplay = input?.map((input) => (
    <Button onClick={add} disabled={props.hasSubmit}>
      {type[1] === "English" ? input.character : input.meaning}
    </Button>
  ));

  const displayAnswer = userInput?.map((input) => (
    <Button
      style={{ backgroundColor: "green" }}
      onClick={remove}
      disabled={props.hasSubmit}
    >
      {type[1] === "English" ? input.character : input.meaning}
    </Button>
  ));

  if (displayAnswer.length !== 0) {
    props.canSubmit(true);
  } else {
    props.canSubmit(false);
  }
  return (
    <>
      <div style={{ backgroundColor: "orange" }}>
        <span>{questionData.question}</span>
        <button onClick={play}>Hi</button>
      </div>
      {displayAnswer}
      <div style={{ backgroundColor: "orange" }}>{choiceDisplay}</div>
      <div hidden={!props.hasSubmit}>
        You are {isCorrect ? "correct" : "wrong"}
      </div>
    </>
  );
}
