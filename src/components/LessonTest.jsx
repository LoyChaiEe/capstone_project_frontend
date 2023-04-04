import React from "react";
import { useLocation } from "react-router-dom";

const LessonTest = () => {
  let { state } = useLocation();
  return <p>{state?.msg}</p>;
};

export default LessonTest;
