import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
import { Progress } from "antd";

const LessonForms = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(true)
  const [answer, setAnswer] = useState([])
  const [input, setInput] = useState([])
  const [submittedAnswer, setSubmittedAnswer] = useState("")

  //Steps contain the data needed for the question
  const steps = [
    {
      title: "Start",
      content: "Click next to start",
    },
    {
      title: "First",
      content: "Translate this sentence: はち",
      input: ["はじめ", "たまご", "はち", "とり"],
      answer: "はち",
    },
    {
      title: "Second",
      content: "Translate this sentence: おおきですか",
      input: ["にしき", "みせ", "まち", "ですか", "なな", "にく", "おおき"],
      answer: "おおきですか",
    },
    {
      title: "Last",
      content: "Translate this sentence: おおきですか",
      input: ["はじめ", "たまご", "はち", "とり", "ろく", "ご"],
      answer: "はちななろくご",
    },
  ];

  //Functions that facilitate the interactivity of the component
  const next = () => {
    //reset every question
    setCurrent(current + 1);
    setHasSubmit(true);
    setInput(steps[current+1].input)
    setAnswer([]);
    setSubmittedAnswer("");
  };
  const submit = () => {
    const ans = answer.join("")
    setHasSubmit(false);
    setSubmittedAnswer(ans)
  };
  const add = (text) => {
    const ans = [...answer, text]
    const userInput = [...input]
    const index = input.indexOf(text);
    userInput.splice(index, 1);
    setAnswer(ans);
    setInput(userInput)
  };
  const remove = (text) => {
    const ans = [...answer];
    const userInput = [...input, text];
    const index = answer.indexOf(text);
    ans.splice(index, 1);
    setAnswer(ans)
    setInput(userInput);
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const inputElement = input.map(x => 
    <Button style={{ color: "green" }} onClick={(e) => add(e.target.textContent)}>{x}</Button>
  )
  const answerElement = answer.map(x => 
  <Button style={{ color: "red" }} onClick={(e) => remove(e.target.textContent)}>{x}</Button>
  )
  return (
    <>
      {/* <Steps current={current} items={items} /> */}
      <Progress percent={((current) / 3) * 100} />
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
        {current < steps.length  && (
          <Button
            style={{
              backgroundColor: submittedAnswer === steps[current].answer ? "green" : "red",
              color: "white",
            }}
            type="primary"
            onClick={() => next()}
            disabled={hasSubmit && current !== 0}
          >
            Next
          </Button>
        )}
        {current < steps.length  && (
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
export default LessonForms;
