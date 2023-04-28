import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../../BACKEND_URL";
import { useOutletContext } from "react-router-dom";
import { Howl } from "howler";
import { TranslationButton, Button } from "../Buttons";
import { useAuth0 } from "@auth0/auth0-react";
import "./translation.css";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function Translation(props) {
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [userData] = useOutletContext();
  const [input, setInput] = useState([]);
  const [userInput, setUserInput] = useState([]); //display the user input answer
  const [isCorrect, setIsCorrect] = useState();
  const { getAccessTokenSilently } = useAuth0();
  const [speaker, setSpeaker] = useState("");

  const type = questionData?.question_type.split("-");

  useEffect(() => {
    const voicevoxVoice = async () => {
      await axios
        .get(`${Backend_URL}/voicevoxes/speaker/${userData.voicevox_id}`)
        .then((res) => {
          setSpeaker(res.data.voicevox_voice);
        });
    };
    voicevoxVoice();
  });

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
    // get access token
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: `${scope}`,
    });
    const correct = await axios.post(
      `${Backend_URL}/questions/translation/verify`,
      {
        userInput: userInput,
        questionID: questionData.question_id,
        lessonID: questionData.lesson_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
    const questionWords = async () => {
      // get access token
      const accessToken = await getAccessTokenSilently({
        audience: `${audience}`,
        scope: `${scope}`,
      });

      await axios
        .post(
          `${Backend_URL}/questions/translation/input`,
          {
            wordBank: wordBank,
            type: type,
            answer: questionData.answer,
            difficulty: questionData.difficulty,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setInput(res.data);
        });
    };
    questionWords();
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
    <TranslationButton onClick={add} disabled={props.hasSubmit} key={input.id}>
      {type[1] === "English" ? input.character : input.meaning}
    </TranslationButton>
  ));

  const displayAnswer = userInput?.map((input) => (
    <TranslationButton
      style={{ backgroundColor: "rgba(233, 171, 158, 0.847)" }}
      onClick={remove}
      disabled={props.hasSubmit}
      key={input.id}
    >
      {type[1] === "English" ? input.character : input.meaning}
    </TranslationButton>
  ));

  if (displayAnswer.length !== 0) {
    props.canSubmit(true);
  } else {
    props.canSubmit(false);
  }

  return (
    <>
      {!props.hasSubmit ? (
        <>
          <div className="user-question-wrapper">
            {questionData.question}
            {type[1] !== "English" && <Button onClick={play}></Button>}
          </div>
          <div className="user-answer-wrapper">{displayAnswer}</div>
          <div className="user-question-wrapper">{choiceDisplay}</div>
        </>
      ) : (
        <div hidden={!props.hasSubmit} className="user-question-wrapper">
          You are {isCorrect ? "correct" : "wrong"}
        </div>
      )}
    </>
  );
}
