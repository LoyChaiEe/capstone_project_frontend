import React, { useState, useEffect } from "react";
import { Backend_URL } from "../../BACKEND_URL";
import axios from "axios";
import { QuestionButton } from "../Buttons";
import { useAuth0 } from "@auth0/auth0-react";
import "./meaning.css";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function Meaning(props) {
  const questionData = props.questionData;
  const wordBank = props.wordBank;
  const [wordArray, setWordArray] = useState([]);
  const [wordSelected, setWordSelected] = useState("");
  const [isWordSelected, setIsWordSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [prevSelectedButton, setPrevSelectedButton] = useState(null);
  const type = questionData?.question_type.split("-");
  const { getAccessTokenSilently } = useAuth0();

  // to display 4 words in an array
  useEffect(() => {
    const questionWords = async () => {
      // get access token
      const accessToken = await getAccessTokenSilently({
        audience: `${audience}`,
        scope: `${scope}`,
      });

      await axios
        .post(
          `${Backend_URL}/questions/meaning/words`,
          {
            wordBank: wordBank,
            type: type,
            answer: questionData.answer,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setWordArray(res.data);
        });
    };
    questionWords();
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
      prevSelectedButton.classList.remove("meaning-selected");
    }

    const selectedButton = e.target;
    selectedButton.classList.add("meaning-selected");
    const selected = selectedButton.textContent;
    setWordSelected(selected);
    setIsWordSelected(true);
    setPrevSelectedButton(selectedButton);
  };

  const verifyAnswer = async () => {
    // get access token
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: `${scope}`,
    });

    const answer = await axios.post(
      `${Backend_URL}/questions/meaning/verify`,
      {
        userInput: wordSelected,
        questionID: questionData.question_id,
        lessonID: questionData.lesson_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setIsCorrect(answer.data.isCorrect);
  };

  const wordArrayDisplay = wordArray.map((wordArray) => (
    <QuestionButton
      onClick={select}
      disabled={props.hasSubmit}
      key={wordArray.id}
    >
      {type[1] === "English" ? wordArray.character : wordArray.meaning}
    </QuestionButton>
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
      {!props.hasSubmit ? (
        <>
          <span className="user-question-wrapper">{questionData.question}</span>
          <div className="user-answer-wrapper">
            <div className="wordArray-grid">{wordArrayDisplay}</div>
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
