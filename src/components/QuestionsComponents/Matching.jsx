import React, { useEffect, useState } from "react";
import "./matching.css";
import { Button, ConfigProvider } from "antd";
import axios from "axios";
import { Backend_URL } from "../../BACKEND_URL";
import { useOutletContext } from "react-router-dom";
import { Howl } from "howler";
import { useAuth0 } from "@auth0/auth0-react";

//global for the question
let disabledTrackerLeft = {};
let disabledTrackerRight = {};
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function Matching(props) {
  const questionData = props.questionData;
  const [userData] = useOutletContext();
  const [leftSelect, setLeftSelect] = useState("");
  const [rightSelect, setRightSelect] = useState("");
  const [inputRow, setInputRow] = useState([]); // This is the left row
  const [outputRow, setOutputRow] = useState([]); // This is the right row
  const [count, setCount] = useState(0);
  const { getAccessTokenSilently } = useAuth0();
  const [speaker, setSpeaker] = useState("");

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

  //query random input
  useEffect(() => {
    const questionWords = async () => {
      // get access token
      const accessToken = await getAccessTokenSilently({
        audience: `${audience}`,
        scope: `${scope}`,
      });

      await axios
        .post(
          `${Backend_URL}/questions/matching/random`,
          {
            questionData: questionData,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setInputRow(res.data.inputRow);
          setOutputRow(res.data.outputRow);
          for (let i = 0; i < 5; i++) {
            disabledTrackerLeft[`${res.data.inputRow[i]}`] = false;
            disabledTrackerRight[`${res.data.outputRow[i]}`] = false;
          }
        });
    };
    questionWords();
    setCount(0);
    disabledTrackerLeft = {};
    disabledTrackerRight = {};
  }, [questionData]);

  //verify
  useEffect(() => {
    if (leftSelect !== "" && rightSelect !== "") {
      const verifyingAnswer = async () => {
        // get access token
        const accessToken = await getAccessTokenSilently({
          audience: `${audience}`,
          scope: `${scope}`,
        });
        await axios
          .post(
            `${Backend_URL}/questions/matching/verify`,
            {
              left: leftSelect,
              right: rightSelect,
              type: questionData.question_type.split("-"),
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            if (res.data.isCorrect) {
              disabledTrackerLeft[`${leftSelect}`] = true;
              disabledTrackerRight[`${rightSelect}`] = true;
              setCount(count + 1);
            }
            //  else {
            //   //for future changing colour to red
            //   console.log("you are wrong");
            // }
            setLeftSelect("");
            setRightSelect("");
          });
      };
      verifyingAnswer();
    }
  }, [leftSelect, rightSelect]);

  const addLeft = async (e) => {
    const text = e.target.textContent;
    const answers = questionData.answer.split("、");
    const index = answers.indexOf(text);
    if (index > -1) {
      const word = answers[index];
      const data = await createAudio(word);
      const audioSRC = URL.createObjectURL(data);
      const sound = new Howl({
        src: [audioSRC],
        autoplay: false,
        loop: false,
        volume: 3,
        format: "wav",
      });
      if (!questionData.audio_disabled) {
        sound.play();
      }
    }
    setLeftSelect(text);
  };

  const addRight = async (e) => {
    const text = e.target.textContent;
    const answers = questionData.answer.split("、");
    const index = answers.indexOf(text);
    if (index > -1) {
      const word = answers[index];
      const data = await createAudio(word);
      const audioSRC = URL.createObjectURL(data);
      const sound = new Howl({
        src: [audioSRC],
        autoplay: false,
        loop: false,
        volume: 3,
        format: "wav",
      });
      if (!questionData.audio_disabled) {
        sound.play();
      }
    }
    setRightSelect(text);
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

  //Set output rows
  const leftCol = inputRow?.map((x, i) => (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ee9f90",
        },
      }}
      key={i}
    >
      <Button
        type="primary"
        onClick={addLeft}
        id={x === leftSelect ? "default" : "white"}
        disabled={disabledTrackerLeft[`${x}`]}
      >
        {x}
      </Button>
    </ConfigProvider>
  ));

  const rightCol = outputRow?.map((x, i) => (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ee9f90",
        },
      }}
      key={i}
    >
      <Button
        type="primary"
        onClick={addRight}
        id={x === rightSelect ? "default" : "white"}
        disabled={disabledTrackerRight[`${x}`]}
      >
        {x}
      </Button>
    </ConfigProvider>
  ));

  // if (count === 5) {
  //   props.setHasSubmit(true);
  // }

  useEffect(() => {
    if (count === 5) {
      props.setHasSubmit(true);
    }
  }, [count]);

  return (
    <>
      <span className="user-question-wrapper">{questionData.question}</span>
      <div className="matching-grid-container">
        <div className="columns">{leftCol}</div>
        <div className="columns">{rightCol}</div>
      </div>
    </>
  );
}
