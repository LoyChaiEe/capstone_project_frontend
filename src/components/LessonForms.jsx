import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Steps, theme } from "antd";
import { useState } from "react";

const LessonForms = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(true)
  const [answer, setAnswer] = useState([])
  const [input, setInput] = useState(["はじめ","たまご","はち","とり"])
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const correctAns = "はち";

  //Functions that facilitate the interactivity of the component
  const next = () => {
    setCurrent(current + 1);
    setHasSubmit(true);
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


  const steps = [
    {
      title: "First",
      content: "Translate this sentence: はち",
      display: answer.map((x) => {
        return (
          <Button
            style={{ color: "red" }}
            onClick={(e) => remove(e.target.textContent)}
          >
            {x}
          </Button>
        );
      }),
      input: input.map((x) => (
        <Button
          style={{ color: "green" }}
          onClick={(e) => add(e.target.textContent)}
        >
          {x}
        </Button>
      )),
    },
    {
      title: "Second",
      content: "Second-content",
      input: input,
    },
    {
      title: "Last",
      content: "Last-content",
      input: input,
    },
  ];
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
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {steps[current].content}
        {steps[current].display}
        {steps[current].input}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button
            style={{
              backgroundColor: submittedAnswer === correctAns ? "green" : "red",
              color: "white",
            }}
            type="primary"
            onClick={() => next()}
            disabled={hasSubmit}
          >
            Next
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => submit()} disabled={!hasSubmit}>
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
