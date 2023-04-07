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
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
const getter = (url) => axios.get(url).then((res) => res.data);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LessonTest = () => {
  const { state } = useLocation();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [input, setInput] = useState([]);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  //const [randomQuestionNumber, setRandomQuestionNumber] = useState([]);
  // the 1 at the end is userID, waiting for userContext, may need to refer to project 3
  const {
    data: userLessonInfo,
    mutate: refetchULinfo,
    isLoading: userLessonDataLoaded,
  } = useSWR(`${Backend_URL}/userLesson/${state.type}/1`, getter);
  const {
    data: userWordBank,
    mutate: refetchUWinfo,
    isLoading: userWordbankDataLoaded,
  } = useSWR(`${Backend_URL}/userWordBank/${state.type}/1`, getter);
  //Potential bug since the way our data structured only handle 1 chapter per lesson type
  //So if user click next node for chapter 2, it will be lesson_id = 11, which is a hiragana/katakana/nonexistent lesson
  //Need some way to restructure our backend seeder file for this
  //this just temp
  const {
    data: LQA,
    mutate: refetchLQinfo,
    isLoading: LQADataLoaded,
    error
  } = useSWR(
    `${Backend_URL}/LQA/${userLessonInfo?.slice(-1)[0].lesson?.id + 1}`,
    getter
  );

  //Loader for loading data
  if (userLessonDataLoaded || userWordbankDataLoaded || LQADataLoaded || !userWordBank || !userLessonInfo || !LQA)
    return <BeatLoader css={override} size={20} color={"#123abc"} />;
  const questionNumberList = new Set();
  LQA?.map((ele) => ele.question_id).forEach((id) =>
    questionNumberList.add(id)
  );
  const questionList = Array.from(questionNumberList)
  //Error handling of undefined values, check with Rob how to improve this
  let arr = generateRandomNumbers(15, questionList.length, questionList)
  console.log(arr);
  //Steps contain the data/conmponent  to display on the question needed for the question
  const steps = [
    {
      title: "Start",
      content: <Start type={state.type}/>,
    },
  ];

  //Functions that facilitate the interactivity of the component
  //Functionality of Next, a reset of all input etc and enabling/disabling buttons
  const next = () => {
    //reset every question
    setCurrent(current + 1);
    setHasSubmit(true);
    setInput(steps[current + 1].input);
    setAnswer([]);
    setSubmittedAnswer("");
  };
  //Functionality of sumbit
  const submit = () => {
    const ans = answer.join("");
    setHasSubmit(false);
    setSubmittedAnswer(ans);
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
  return (
    <>
      {/* <Steps current={current} items={items} /> */}
      <Progress percent={(current / 3) * 100} />
      <div style={contentStyle}>
        {steps[current].content}
        {steps[current].display}
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

const questionSelect = (num) => {};

function generateRandomNumbers(count, max, data) {
  const numbers = [];
  while (numbers.length < count) {
    const random = Math.floor(Math.random() * max) + 1;
    if (!numbers.includes(data[random])) {
      numbers.push(data[random]);
    }
  }

  return numbers;
}

