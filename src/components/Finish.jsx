import React from "react";
import { Teacher } from "./PNG";
import { Link } from "react-router-dom";
import { AdvancementButton } from "./Buttons";
import "./startFinish.css";
import { Backend_URL } from "../BACKEND_URL";
import axios from "axios";

const Finish = (props) => {
  const placeholder = props.type; //Depends on type
  console.log(props);

  const handleClick = () => {
    const addintowordbank = async () => {
      await axios
        .post(`${Backend_URL}/userWordbank/update/hiragana`, {
          user_id: props.user_id,
          lesson_id: props.lesson_id,
        })
        .then((res) => {
          console.log(res.data);
        });
    };
    addintowordbank();
  };

  return (
    <>
      <div className="start-finish-wrapper">
        <Teacher />
        <p>FINISH!</p>
        <button onClick={handleClick}>press</button>
        <Link to="/lesson" className="link-text-wrapper">
          <AdvancementButton>Go to Home</AdvancementButton>
        </Link>
      </div>
    </>
  );
};

export default Finish;
