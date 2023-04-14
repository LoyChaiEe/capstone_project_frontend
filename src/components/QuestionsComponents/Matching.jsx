import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../SVG";
import "./matching.css";
import { Button } from "antd";
import axios from "axios";
import { Backend_URL } from "../../BACKEND_URL";

export default function Matching(props) {
  const questionData = props.questionData;
  const [leftSelect, setLeftSelect] = useState("");
  const [rightSelect, setRightSelect] = useState("");
  const [inputRow, setInputRow] = useState([]); // This is the left row
  const [outputRow, setOutputRow] = useState([]); // This is the right row

  useEffect(() => {
    axios.post(`${Backend_URL}/questions/matching/random`, {questionData: questionData}).then((res) => {
      setInputRow(res.data.inputRow)
      setOutputRow(res.data.outputRow)
    })
  }, [questionData]);
  //Set output rows
  const leftCol = inputRow?.map((x) => (
    <Button className={"matching-grid-item"}>{x}</Button>
  ));
  const rightCol = outputRow?.map((x) => (
    <Button className={"matching-grid-item"}>{x}</Button>
  ));

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
      <button onClick={() => props.canSubmit(true)}>disable/enable</button>
    </>
  );
}

