import React from "react";
import { useLocation } from "react-router-dom";

const LessonTest = (props) => {
  let { state } = useLocation();
  return <p>{state.msg}</p>;
};

export default LessonTest;
