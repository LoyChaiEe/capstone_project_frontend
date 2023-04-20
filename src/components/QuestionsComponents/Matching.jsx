import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../PNG";
import "./matching.css";
import { Button } from "antd";
import { QuestionButton } from "../Buttons";
import axios from "axios";
import { Backend_URL } from "../../BACKEND_URL";
//global for the question
let disabledTrackerLeft = {};
let disabledTrackerRight = {};

export default function Matching(props) {
  const questionData = props.questionData;
  const [leftSelect, setLeftSelect] = useState("");
  const [rightSelect, setRightSelect] = useState("");
  const [inputRow, setInputRow] = useState([]); // This is the left row
  const [outputRow, setOutputRow] = useState([]); // This is the right row
  const [count, setCount] = useState(0);
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
  const addLeft = (e) => {
    const text = e.target.textContent;
    setLeftSelect(text);
  };

  const addRight = (e) => {
    const text = e.target.textContent;
    setRightSelect(text);
  };
  console.log(disabledTrackerLeft);
  console.log(disabledTrackerRight);
  //Set output rows
  const leftCol = inputRow?.map((x, i) => (
    <QuestionButton
      onClick={addLeft}
      id={x === leftSelect ? "blue" : "white"}
      disabled={disabledTrackerLeft[`${x}`]}
      key={i}
    >
      {x}
    </QuestionButton>
  ));
  const rightCol = outputRow?.map((x, i) => (
    <QuestionButton
      onClick={addRight}
      id={x === rightSelect ? "blue" : "white"}
      disabled={disabledTrackerRight[`${x}`]}
      key={i}
    >
      {x}
    </QuestionButton>
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
