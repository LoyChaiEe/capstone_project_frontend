import React from "react";
import { Teacher } from "./PNG";
import "./startFinish.css";

const Start = (props) => {
  const placeholder = props.type; //Depends on type
  return (
    <>
      <div className="start-finish-wrapper">
        <Teacher />
        <p>Lets start learning some Japanese {placeholder}!</p>
      </div>
    </>
  );
};

export default Start;
