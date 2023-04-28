import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, message, Steps, theme, ConfigProvider } from "antd";
import { useState } from "react";
import { Progress, Spin } from "antd";
import Start from "../components/Start";
import useSWR from "swr";
import { Backend_URL } from "../BACKEND_URL";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import Matching from "../components/QuestionsComponents/Matching";
import Meaning from "../components/QuestionsComponents/Meaning";
import Translation from "../components/QuestionsComponents/Translation";
import Recognition from "../components/QuestionsComponents/Recognition";
import Finish from "../components/Finish";
import { useAuth0 } from "@auth0/auth0-react";
import "./lesson.css";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LessonTest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { state } = useLocation();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);
  //const [randomQuestionNumber, setRandomQuestionNumber] = useState([]);
  // the 1 at the end is userID, waiting for userContext, may need to refer to project 3
  //{ revalidateOnFocus: false } to prevent alt-tab from re-rendering

  const getter = async (url) => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: `${scope}`,
    });

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  const {
    data: userLessonInfo,
    mutate: refetchULinfo,
    isLoading: userLessonDataLoaded,
  } = useSWR(`${Backend_URL}/userLesson/${state?.type}/1`, getter, {
    revalidateOnFocus: false,
  });
  const {
    data: userWordBank,
    mutate: refetchUWinfo,
    isLoading: userWordbankDataLoaded,
  } = useSWR(`${Backend_URL}/userWordBank/${state?.type}/1`, getter, {
    revalidateOnFocus: false,
  });
  //Potential bug since the way our data structured only handle 1 chapter per lesson type
  //So if user click next node for chapter 2, it will be lesson_id = 11, which is a hiragana/katakana/nonexistent lesson
  //Need some way to restructure our backend seeder file for this
  //this just temp

  //Question Data will be changed for testing
  // const {
  //   data: questionsDatas,
  //   mutate: refetchLQinfo,
  //   isLoading: LQADataLoaded,
  //   error,
  // } = useSWR(
  //   `${Backend_URL}/LQA/questions/get/${
  //     userLessonInfo?.slice(-1)[0].lesson?.id + 1
  //   }`,
  //   getter,
  //   { revalidateOnFocus: false }
  // );

  //Testing for matching
  const {
    data: questionsDatas,
    mutate: refetchLQinfo,
    isLoading: LQADataLoaded,
    error,
  } = useSWR(`${Backend_URL}/tests/questions/get/${14}`, getter, {
    revalidateOnFocus: false,
  });

  //Loader for loading data
  if (
    userLessonDataLoaded ||
    userWordbankDataLoaded ||
    LQADataLoaded ||
    !userWordBank ||
    !userLessonInfo ||
    !questionsDatas
  )
    // return <BeatLoader css={override} size={20} color={"#123abc"} />;
    return (
      <div className="lesson-container">
        <Spin size="large" />
      </div>
    );

  //Steps contain the data/conmponent  to display on the question needed for the question
  const steps = [
    {
      title: "Start",
      content: <Start type={state.type} />,
    },
  ];
  for (let i = 0; i < 3; i++) {
    const questionData = questionsDatas[i];
    const type = questionData.question_type.split("-");
    let content = {
      title: `Question ${i + 1}`,
      content: questionSelect(
        type[0],
        questionData,
        userWordBank,
        setCanSubmit,
        hasSubmit,
        setHasSubmit
      ),
    };
    steps.push(content);
    console.log(questionData);
  }
  steps.push({
    title: "Finish",
    content: <Finish lesson_id={0} user_id={0} />,
  });

  //Functions that facilitate the interactivity of the component
  //Functionality of Next, a reset of all input etc and enabling/disabling buttons
  const next = (e) => {
    e.preventDefault();
    //reset every question
    setCurrent(current + 1);
    setHasSubmit(false);
    setCanSubmit(false);
  };
  //Functionality of sumbit
  const submit = (e) => {
    e.preventDefault();
    setHasSubmit(true);
    setCanSubmit(false);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  console.log(items);

  return (
    <>
      <div className="lesson-container">
        <div className="lesson-wrapper">
          <Progress
            percent={((current / 15) * 100).toFixed(0)}
            strokeColor={"#570344"}
            size={[500, 20]}
          />
          <div className="question-wrapper">
            {steps[current].content}
            {steps[current].display}
          </div>
          <div className="advancement-wrapper">
            {current < steps.length && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ee9f90",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={next}
                  disabled={!hasSubmit && current !== 0}
                >
                  NEXT
                </Button>
              </ConfigProvider>
            )}
            {current < steps.length && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ee9f90",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={submit}
                  disabled={!canSubmit || hasSubmit}
                >
                  SUBMIT
                </Button>
              </ConfigProvider>
            )}
            {current === steps.length - 1 && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ee9f90",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => message.success("Processing complete!")}
                >
                  DONE
                </Button>
              </ConfigProvider>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonTest;
// this function act as to display the type of question and also pass some impt question data and function into the question
function questionSelect(
  type,
  questionData,
  wordBank,
  submitFunction,
  hasSubmit,
  hasSubmitFunction
) {
  switch (type) {
    case "recognition":
      return (
        <Recognition
          questionData={questionData}
          wordBank={wordBank}
          canSubmit={submitFunction}
          hasSubmit={hasSubmit}
        />
      );
    case "meaning":
      return (
        <Meaning
          questionData={questionData}
          wordBank={wordBank}
          canSubmit={submitFunction}
          hasSubmit={hasSubmit}
        />
      );
    case "matching":
      return (
        <Matching
          questionData={questionData}
          setHasSubmit={hasSubmitFunction}
        />
      );
    case "translation":
      return (
        <Translation
          questionData={questionData}
          wordBank={wordBank}
          canSubmit={submitFunction}
          hasSubmit={hasSubmit}
        />
      );
    default:
      return 0;
  }
}
