import React, { useEffect, useState } from "react";
import "./matching.css";
import { Button, ConfigProvider } from "antd";
import axios from "axios";
import { Backend_URL } from "../../BACKEND_URL";
import { useOutletContext } from "react-router-dom";
import { Howl } from "howler";

//global for the question
let disabledTrackerLeft = {};
let disabledTrackerRight = {};

export default function Matching(props) {
  const questionData = props.questionData;
  const [userData] = useOutletContext();
  const [leftSelect, setLeftSelect] = useState("");
  const [rightSelect, setRightSelect] = useState("");
  const [inputRow, setInputRow] = useState([]); // This is the left row
  const [outputRow, setOutputRow] = useState([]); // This is the right row
  const [count, setCount] = useState(0);

  const speaker = userData.voicevox_id;

  //query random input
  useEffect(() => {
    axios
      .post(`${Backend_URL}/questions/matching/random`, {
        questionData: questionData,
      })
      .then((res) => {
        setInputRow(res.data.inputRow);
        setOutputRow(res.data.outputRow);
        for (let i = 0; i < 5; i++) {
          disabledTrackerLeft[`${res.data.inputRow[i]}`] = false;
          disabledTrackerRight[`${res.data.outputRow[i]}`] = false;
        }
      });
    setCount(0);
    disabledTrackerLeft = {};
    disabledTrackerRight = {};
  }, [questionData]);

  //verify
  useEffect(() => {
    if (leftSelect !== "" && rightSelect !== "") {
      axios
        .post(`${Backend_URL}/questions/matching/verify`, {
          left: leftSelect,
          right: rightSelect,
          type: questionData.question_type.split("-"),
        })
        .then((res) => {
          if (res.data.isCorrect) {
            disabledTrackerLeft[`${leftSelect}`] = true;
            disabledTrackerRight[`${rightSelect}`] = true;
            setCount(count + 1);
          } else {
            //for future changing colour to red
            console.log("you are wrong");
          }
          setLeftSelect("");
          setRightSelect("");
        });
    }
  }, [leftSelect, rightSelect]);

  const addLeft = async (e) => {
    const text = e.target.textContent;
    const data = await createAudio(text);
    const audioSRC = URL.createObjectURL(data);
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 3,
      format: "wav",
    });
    sound.play();
    setLeftSelect(text);
  };

  const addRight = (e) => {
    const text = e.target.textContent;
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
    >
      <Button
        type="primary"
        onClick={addLeft}
        id={x === leftSelect ? "default" : "white"}
        disabled={disabledTrackerLeft[`${x}`]}
        key={i}
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
    >
      <Button
        type="primary"
        onClick={addRight}
        id={x === rightSelect ? "default" : "white"}
        disabled={disabledTrackerRight[`${x}`]}
        key={i}
      >
        {x}
      </Button>
    </ConfigProvider>
  ));

  if (count === 5) {
    props.setHasSubmit(true);
  }

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
