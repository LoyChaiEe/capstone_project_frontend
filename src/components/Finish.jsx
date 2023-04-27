import React from "react";
import { Teacher } from "./PNG";
import { Link } from "react-router-dom";
import { AdvancementButton } from "./Buttons";
import "./startFinish.css";

const Finish = (props) => {
  const placeholder = props.type; //Depends on type
  console.log(placeholder);
  return (
    <>
      <div className="start-finish-wrapper">
        <Teacher />
        <p>FINISH!</p>
        <Link to="/lesson" className="link-text-wrapper">
          <AdvancementButton>Go to Home</AdvancementButton>
        </Link>
      </div>
    </>
  );
};

export default Finish;
