import React from "react";
import "./questionModalBody.css";

export default function QuestionModalBody(props) {
  return (
    <div>
      <h1>This is guide</h1>
      {props.children}
    </div>
  );
}
