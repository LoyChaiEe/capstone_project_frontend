import React, {useRef, useState, useEffect} from "react";
import { MiniCharacter } from "../SVG";
import axios from "axios"

export default function Writing(props) {
  const canvasRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  //initialise white background and thickness of brush
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 10;
  }, []);

  //when user hold down the mouse button, draw
  const handleMouseDown = (event) => {
    setMouseCoordinates(event);
    setIsDrawing(true);

    // Start Drawing
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  };

  //track user's mouse cursor
  const handleMouseMove = (event) => {
    setMouseCoordinates(event);

    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  };

  //When user done drawing
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

  //Clear canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  //Modelpredict, send an axios request to flask backend
  const predict = async() => {
    const canvas = canvasRef.current;
    const canvasDataURL = canvas.toDataURL("image/png", 1.0); // set the MIME type to PNG
    try {
      const response = await axios.post("http://localhost:5000/writing/verify/hiragana", {
        dataURL: canvasDataURL,
        answer: "し"
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="left-block">
        <div className="buttons">
          <button id="clear" type="button" onClick={handleClear}>
            Clear
          </button>
          <button id="save" type="button" onClick={predict}>
            predict
          </button>
        </div>
      </div>
      <div className="right-block">
        <canvas
          id="paint-canvas"
          width="640"
          height="400"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    </main>
  )
}


// return (
//   <>
//     <div>
//       Welcome to Test
//       <MiniCharacter />
//     </div>
//     <div>Questions</div>
//     <div>Answer display</div>
//     <div>Possible inputs</div>
//     <button onClick={() => props.canSubmit(true)}>disable/enable</button>
//   </>
// );