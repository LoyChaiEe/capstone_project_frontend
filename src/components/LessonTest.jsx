import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
import { Progress } from "antd";
import Start from "./Start"
import useSWR from "swr"
import { Backend_URL } from "../BACKEND_URL";
const getter = (url) => axios.get(url).then((res) => res.data);

const LessonTest = () => {
  const { state } = useLocation();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [input, setInput] = useState([]);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  // the 1 at the end is userID, waiting for userContext, may need to refer to project3
  const { data: userLessonInfo, mutate: refetchULinfo } = useSWR(`${Backend_URL}/userLesson/${state.type}/1`,getter);
  const { data: userWordBank, mutate: refetchUWinfo } = useSWR(`${Backend_URL}/userWordBank/${state.type}/1`,getter);
  //Potential bug since the way our data structured only handle 1 chapter per lesson type
  //So if user click next node for chapter 2, it will be lesson_id = 11, which is a hiragana/katakana/nonexistent lesson
  //Need some way to restructure our backend seeder file for this
  //this just temp
  const { data: lessonQuestion, mutate: refetchLQinfo } = useSWR(`${Backend_URL}/lessonQuestion/${userLessonInfo?.slice(-1)[0].lesson?.id+1}`,getter);
  console.log(userLessonInfo)
  console.log(userWordBank)


  //Steps contain the data needed for the question
  const steps = [
    {
      title: "Start",
      content: <Start type={state.type}/>,
    },
  ];

  //Functions that facilitate the interactivity of the component
  const next = () => {
    //reset every question
    setCurrent(current + 1);
    setHasSubmit(true);
    setInput(steps[current + 1].input);
    setAnswer([]);
    setSubmittedAnswer("");
  };
  const submit = () => {
    const ans = answer.join("");
    setHasSubmit(false);
    setSubmittedAnswer(ans);
  };
  const add = (text) => {
    const ans = [...answer, text];
    const userInput = [...input];
    const index = input.indexOf(text);
    userInput.splice(index, 1);
    setAnswer(ans);
    setInput(userInput);
  };
  const remove = (text) => {
    const ans = [...answer];
    const userInput = [...input, text];
    const index = answer.indexOf(text);
    ans.splice(index, 1);
    setAnswer(ans);
    setInput(userInput);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const inputElement = input.map((x) => (
    <Button
      style={{ color: "green" }}
      onClick={(e) => add(e.target.textContent)}
    >
      {x}
    </Button>
  ));
  const answerElement = answer.map((x) => (
    <Button
      style={{ color: "red" }}
      onClick={(e) => remove(e.target.textContent)}
    >
      {x}
    </Button>
  ));
  return (
    <>
      {/* <Steps current={current} items={items} /> */}
      <Progress percent={(current / 3) * 100} />
      <div style={contentStyle}>
        {steps[current].content}
        {steps[current].display}
        {answerElement}
        {inputElement}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length && (
          <Button
            style={{
              backgroundColor:
                submittedAnswer === steps[current].answer ? "green" : "red",
              color: "white",
            }}
            type="primary"
            onClick={() => next()}
            disabled={hasSubmit && current !== 0}
          >
            Next
          </Button>
        )}
        {current < steps.length && (
          <Button
            type="primary"
            onClick={() => submit()}
            disabled={!hasSubmit || answer.length === 0}
          >
            Submit
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};
export default LessonTest;

