import React from "react";
import { MiniCharacter } from "../SVG";

export default function Meaning(props) {
  return (
    <>
      <div>
        Welcome to Meaning
        <MiniCharacter />
      </div>
      <div>Questions</div>
      <div>Possible inputs</div>
      <button onClick={() => props.canSubmit(true)}>disable/enable</button>
    </>
  );
}
