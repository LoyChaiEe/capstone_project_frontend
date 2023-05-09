import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import { Button, theme, ConfigProvider } from "antd";
import { useState } from "react";
import { Progress, Spin } from "antd";
import Start from "../components/Start";
import useSWR from "swr";
import { Backend_URL } from "../BACKEND_URL";
import { css } from "@emotion/react";
import Matching from "../components/QuestionsComponents/Matching";
import Meaning from "../components/QuestionsComponents/Meaning";
import Translation from "../components/QuestionsComponents/Translation";
import Recognition from "../components/QuestionsComponents/Recognition";
import Writing from "../components/QuestionsComponents/Writing";
import Finish from "../components/Finish";
import { useAuth0 } from "@auth0/auth0-react";
import "./lesson.css";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

// why is this not in the lesson.css?
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
  const [userData] = useOutletContext();
  // very hard to read component with all these code blocks commented out. Not good practice.

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

  // const {
  //   data: userLessonInfo,
  //   mutate: refetchULinfo,
  //   isLoading: userLessonDataLoaded,
  // } = useSWR(
  //   // `${Backend_URL}/userLesson/${state?.type}/${state?.lesson_id}`,
  //   `${Backend_URL}/userLesson/${state?.type}/${14}`,
  //   getter,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const userWordBank = state.wordBank;
  // const {
  //   data: userWordBank,
  //   mutate: refetchUWinfo,
  //   isLoading: userWordbankDataLoaded,
  // } = useSWR(
  //   `${Backend_URL}/userWordBank/${state?.type}/${state?.lesson_id}`,
  //   getter,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  // console.log(userWordBank);
  //Potential bug since the way our data structured only handle 1 chapter per lesson type
  //So if user click next node for chapter 2, it will be lesson_id = 11, which is a hiragana/katakana/nonexistent lesson
  //Need some way to restructure our backend seeder file for this
  //this just temp

  //Question Data will be changed for testing
  const {
    data: questionsDatas,
    mutate: refetchLQinfo,
    isLoading: LQADataLoaded,
    error,
  } = useSWR(`${Backend_URL}/LQA/questions/get/${state.lesson_id}`, getter, {
    revalidateOnFocus: false,
  });

  //Testing for matching
  // const {
  //   data: questionsDatas,
  //   mutate: refetchLQinfo,
  //   isLoading: LQADataLoaded,
  //   error,
  // } = useSWR(`${Backend_URL}/tests/questions/get/${14}`, getter, {
  //   revalidateOnFocus: false,
  // });

  //Loader for loading data
  if (
    // userLessonDataLoaded ||
    // userWordbankDataLoaded ||
    LQADataLoaded ||
    !userWordBank ||
    // !userLessonInfo ||
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
  // backend should return you the necessary data, instead of having to loop on the frontend for it.
  // ideally we just get the data from the BE, push into the steps and done.
  for (let i = 0; i < 15; i++) {
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
  }
  steps.push({
    title: "Finish",
    content: (
      <Finish
        lesson_id={state.lesson_id}
        user_id={userData.id}
        characterType={state?.type}
      />
    ),
  });

  //Functions that facilitate the interactivity of the component // very vague comment
  //Functionality of Next, a reset of all input etc and enabling/disabling buttons
  const next = (e) => {
    e.preventDefault();
    //reset every question
    setCurrent(current + 1);
    setHasSubmit(false);
    setCanSubmit(false);
  };
  //Functionality of sumbit // redundant comment
  const submit = (e) => {
    e.preventDefault();
    setHasSubmit(true);
    setCanSubmit(false);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <div className="lesson-container">
        <div className="lesson-wrapper">
          <Progress
          // we should give this calculation a variable and name it appropriately, so it would make sense to anyone.
            percent={((current / 15) * 100).toFixed(0)}
            strokeColor={"#570344"}
            size={[500, 20]}
            showInfo={false}
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
                  // I recommend not dealing with these double negative statements. This reads as:
                  // If hasSubmit is not true and current is not 0 then the button will be disabled.
                  // This does not make sense to anyone I think.
                  // make a simple variable called isDisabled
                  /*
                    rename hasSubmit first of all to something that makes sense.
                    const hasUserSubmittedLesson for example
                    const isFirstStep = current == 0

                    const isDisabled = !isFirstStep && !hasUserSubmittedLesson
                    disabled={isDisabled}

                    // now this reads as, button is disabled if isDisabled is true. Then upon inspection I can see that:
                    // isDisabled is true if we are not on the first step and if the user has not submitted the lesson yet.

                    In my opinion this is easier to understand thant the inline statement here.
                  */
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
                    // let's create variables for color codes
                    colorPrimary: "#ee9f90",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={submit}
                  // the difference here needs to be clearer by better naming
                  disabled={!canSubmit || hasSubmit}
                >
                  SUBMIT
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
// we could possibly put this function into another file.
// this function act as to display the type of question and also pass some impt question data and function into the question
// can't we create a datastructure that helps us here?

/*

const questionTypes = {
  RECOGNITION: "recognition",
  MEANING: "meaning",
  MATCHING: "matching",
  ...
}

const questionSelections = {
  [questionTypes.RECOGNITION]: Recognition,
  [questionTypes.MATCHING]: Matching ,
  ...
}

const getQuestionSelection = ({ type, ...props }) => {
  const Component = questionSelections[type]
  return <Component {...props} />
}
Now you can just feel free to not pick up the props on the child component.
Might not be the best way to handle this, but with a bit more time spent, we might be able to make this a bit neater here and not so repetitive.

*/
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
    case "writing":
      return (
        <Writing
          questionData={questionData}
          // wordBank={wordBank}
          canSubmit={submitFunction}
          hasSubmit={hasSubmit}
        />
      );
    default:
      return 0;
  }
}
