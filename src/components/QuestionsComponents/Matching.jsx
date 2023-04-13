import React from "react";
import { MiniCharacter } from "../SVG";

export default function Matching(props) {
  console.log(props.questionData);
  console.log(props.wordBank);
  return (
    <>
      <div>
        Welcome to Matching
        <MiniCharacter />
      </div>
      <div>Questions</div>
      <div>Answer display</div>
      <div>Possible inputs</div>
      <button onClick={() => props.canSubmit(true)}>disable/enable</button>
    </>
  );
}
