import React from "react";
import { MiniCharacter } from "../SVG";

export default function Translation(props) {
  return (
    <>
      <div>
        Welcome to Translation
        <MiniCharacter />
      </div>
      <div>Questions</div>
      <div>Answer display</div>
      <div>Possible inputs</div>
    </>
  );
}

// //Functionality of question component,  will move it later
//   const add = (text) => {
//     const ans = [...answer, text];
//     const userInput = [...input];
//     const index = input.indexOf(text);
//     userInput.splice(index, 1);
//     setAnswer(ans);
//     setInput(userInput);
//   };
//   const remove = (text) => {
//     const ans = [...answer];
//     const userInput = [...input, text];
//     const index = answer.indexOf(text);
//     ans.splice(index, 1);
//     setAnswer(ans);
//     setInput(userInput);
//   };

//   const inputElement = input.map((x) => (
//     <Button
//       style={{ color: "green" }}
//       onClick={(e) => add(e.target.textContent)}
//     >
//       {x}
//     </Button>
//   ));
//   const answerElement = answer.map((x) => (
//     <Button
//       style={{ color: "red" }}
//       onClick={(e) => remove(e.target.textContent)}
//     >
//       {x}
//     </Button>
//   ));
