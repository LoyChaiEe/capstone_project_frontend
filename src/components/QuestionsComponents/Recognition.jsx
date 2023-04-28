import React, { useEffect, useState } from "react";
import "./recognition.css";
import { QuestionButton } from "../Buttons";
import axios from "axios";
import { Howl } from "howler";
import { Backend_URL } from "../../BACKEND_URL";
import { useOutletContext } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function Recognition(props) {
  /* Things need to do in this component:
     5. verify correct input
  */

  //Data Retreival
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [userData] = useOutletContext();
  const [inputData, setInputData] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setCorrect] = useState(null);
  const [prevSelectedButton, setPrevSelectedButton] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const speaker = userData.voicevox_id;

  //Retrieve random input
  useEffect(() => {
    const questionWords = async () => {
      // get access token
      const accessToken = await getAccessTokenSilently({
        audience: `${audience}`,
        scope: `${scope}`,
      });

      await axios
        .post(
          `${Backend_URL}/questions/recognition/input`,
          {
            questionData: questionData,
            wordBank: wordBank,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setInputData(res.data);
        });
    };
    questionWords();
    setUserAnswer("");
    setCorrect(null);
    setPrevSelectedButton(null);
  }, [questionData]);

  //Verify answer
  useEffect(() => {
    if (userAnswer !== "") {
      const verifyingAnswer = async () => {
        // get access token
        const accessToken = getAccessTokenSilently({
          audience: `${audience}`,
          scope: `${scope}`,
        });
        await axios
          .post(
            `${Backend_URL}/questions/recognition/verify`,
            {
              answer: questionData,
              userAnswer: userAnswer,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            setCorrect(res.data.isCorrect);
          });
      };
      verifyingAnswer();
    }
  }, [props.hasSubmit]);

  //Play sounds
  const select = async (e) => {
    if (prevSelectedButton) {
      prevSelectedButton.classList.remove("selected");
    }

    const selectedButton = e.target;
    selectedButton.classList.add("selected");
    const text = selectedButton.textContent;
    setPrevSelectedButton(selectedButton);
    //retrieve the id of the button
    //setState to keep track the choice user select
    setUserAnswer(text);
    const choiceData = inputData?.find(
      (obj) => obj.character === text || obj.pronounciation === text
    );
    const wordtoplay = choiceData.character;
    const data = await createAudio(wordtoplay);
    const audioSRC = URL.createObjectURL(data);
    //Audio play portion
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 1,
      format: "wav",
    });
    sound.play();
  };

  const createQuery = async (text) => {
    //change speaker query to the id of the waifu
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

  const inputDisplay = inputData.map((ele, i) => {
    const word = ele.character;
    const pronounciation = ele.pronounciation;
    const type = questionData.question_type.split("-");
    let display;
    if (type[1] === "character") {
      display = pronounciation;
    } else {
      display = word;
    }
    return (
      <QuestionButton onClick={select} disabled={props.hasSubmit} key={i}>
        {display}
      </QuestionButton>
    );
  });

  if (userAnswer !== "") {
    props.canSubmit(true);
  } else {
    props.canSubmit(false);
  }

  return (
    <>
      {!props.hasSubmit ? (
        <>
          <span className="user-question-wrapper">{questionData.question}</span>
          <div className="user-answer-wrapper">
            <div className="wordArray-recognition-grid">{inputDisplay}</div>
          </div>
        </>
      ) : (
        <div hidden={!props.hasSubmit} className="user-question-wrapper">
          You are {isCorrect ? "correct" : "wrong"}
        </div>
      )}
    </>
  );
}
