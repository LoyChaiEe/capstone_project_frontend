import React from "react";
import { MiniCharacter } from "./PNG";

const Start = (props) => {
  const placeholder = props.type; //Depends on type
  return (
    <>
      <MiniCharacter />
      <p>Lets start learning some Japanese {placeholder}!</p>
    </>
  );
};

export default Start;
