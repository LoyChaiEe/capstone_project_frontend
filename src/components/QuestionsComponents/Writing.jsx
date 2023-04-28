import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FLASK_URL } from "../../BACKEND_URL";
import { Button } from "../Buttons";
import "./writing.css";

export default function Writing(props) {
  const canvasRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPainted, setIsPainted] = useState(false);
  const [prediction, setPrediction] = useState("");
  const questionData = props.questionData;
  const type = questionData.question_type.split("-");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 10;
    setPrediction("");
  }, [questionData]);

  //Enable/disable submit button
  useEffect(() => {
    if (isPainted) {
      props.canSubmit(true);
    }
  }, [isPainted, props]);

  const handleMouseDown = (event) => {
    setMouseCoordinates(event);
    setIsDrawing(true);
    setIsPainted(true);

    // Start Drawing
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  };

  const handleMouseMove = (event) => {
    setMouseCoordinates(event);

    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  };

  const handleMouseUp = (event) => {
    setMouseCoordinates(event);
    setIsDrawing(false);
  };

  const setMouseCoordinates = (event) => {
    const canvas = canvasRef.current;
    const boundings = canvas.getBoundingClientRect();
    setMouseX(event.clientX - boundings.left);
    setMouseY(event.clientY - boundings.top);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
    setIsPainted(false);
    props.canSubmit(false);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    const canvasDataURL = canvas.toDataURL("image/png", 1.0); // set the MIME type to PNG
    try {
      const response = await axios.post(
        //`${FLASK_URL}/writing/verify/${type[2]}`,
        "http://localhost:5000/writing/verify/hiragana",
        {
          dataURL: canvasDataURL,
          answer: questionData.answer,
        }
      );
      setPrediction(response.data.output);
      console.log(response.data.output);
    } catch (error) {
      console.error(error);
    }
  };

  //Verify the input of the user using machine learning models
  useEffect(() => {
    if (props.hasSubmit) {
      handleSave();
    }
  }, [props.hasSubmit]);
  return (
    <>
      <div>
        <span className="user-question-wrapper">{questionData.question}</span>
      </div>
      <div className="right-block" style={{ backgroundColor: "orange" }}>
        <canvas
          id="paint-canvas"
          width="640"
          height="400"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
        <br />
        <Button id="clear" type="button" onClick={handleClear}>
          Clear
        </Button>
        {prediction !== "" && (
          <span hidden={!props.hasSubmit} className="user-question-wrapper">
            You wrote {prediction}
          </span>
        )}
      </div>
    </>
  );
}
