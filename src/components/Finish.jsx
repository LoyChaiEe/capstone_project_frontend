import React from "react";
import { MiniCharacter } from "./PNG";
import { Link } from "react-router-dom";

const Finish = (props) => {
  const placeholder = props.type; //Depends on type
  console.log(placeholder);
  return (
    <>
      <MiniCharacter />
      <p>FINISH!</p>
      <Link to={`/home`}>
        <button>Go to Home</button>
      </Link>
    </>
  );
};

export default Finish;
