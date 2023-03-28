import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];
const LessonForms = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(true)
  const next = () => {
    setCurrent(current + 1);
    setHasSubmit(true)
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const submit = () => {
    setHasSubmit(false)
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
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} disabled={hasSubmit}>
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
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default LessonForms;
