import React from "react";
import { MiniCharacter } from "./SVG";
import { Link } from "react-router-dom";

const Finish = (props) => {
  const placeholder = props.type; //Depends on type
  return (
    <>
      <MiniCharacter />
      <p>FINISH!</p>
      <Link to={`/`} >
        <button>Go to Home</button>
      </Link>
    </>
  );
};

export default Finish;
