import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../SVG";
import "./matching.css";
import { Button } from "antd";
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
  const [count, setCount] = useState(0)
  //query random input
  useEffect(() => {
    axios.post(`${Backend_URL}/questions/matching/random`, {questionData: questionData}).then((res) => {
      setInputRow(res.data.inputRow)
      setOutputRow(res.data.outputRow)
      for(let i = 0; i < 5; i++){
        disabledTrackerLeft[`${res.data.inputRow[i]}`] = false
        disabledTrackerRight[`${res.data.outputRow[i]}`] = false;
      }
    })
    setCount(0)
    disabledTrackerLeft={}
    disabledTrackerRight={}
  }, [questionData]);
  //verify
  useEffect(() => {
    if(leftSelect !== "" && rightSelect !== ""){
      axios.post(`${Backend_URL}/questions/matching/verify`, {
        left: leftSelect,
        right: rightSelect,
        type: questionData.question_type.split("-")
      }).then((res) => {
        if(res.data.isCorrect){
          disabledTrackerLeft[`${leftSelect}`] = true
          disabledTrackerRight[`${rightSelect}`] = true
          setCount(count + 1)
        }else{
          //for future changing colour to red
          console.log("you are wrong")
        }
        setLeftSelect("");
        setRightSelect("");
      })
    }
  }, [leftSelect, rightSelect])
  const addLeft = (e) =>{
    const text = e.target.textContent;
    setLeftSelect(text)
  }

  const addRight = (e) => {
    const text = e.target.textContent;
    setRightSelect(text)
  };
  console.log(disabledTrackerLeft)
  console.log(disabledTrackerRight);
  //Set output rows
  const leftCol = inputRow?.map((x) => (
    <Button
      onClick={addLeft}
      className={"matching-grid-item"}
      style={{ backgroundColor: x === leftSelect ? "blue" : "white" }}
      disabled={disabledTrackerLeft[`${x}`]}
    >
      {x}
    </Button>
  ));
  const rightCol = outputRow?.map((x) => (
    <Button
      onClick={addRight}
      className={"matching-grid-item"}
      style={{ backgroundColor: x === rightSelect ? "blue" : "white" }}
      disabled={disabledTrackerRight[`${x}`]}
    >
      {x}
    </Button>
  ));

  if(count === 5){
    props.setHasSubmit(true)
  }

  return (
    <>
      <div>
        <MiniCharacter />
        <span>{questionData.question}</span>
      </div>
      <div className="matching-grid-container">
        <div>{leftCol}</div>
        <div>{rightCol}</div>
      </div>
    </>
  );
}

