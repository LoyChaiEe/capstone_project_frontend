import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../SVG";
import axios from "axios";
import useSWR from "swr"
import { Backend_URL } from "../../BACKEND_URL";
const postData = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

export default function Translation(props) {
  const questionData = props.questionData
  const wordBank = props.wordBank
  const [input, setInput] = useState([])
  const[display, setDisplay] = useState([])
  const [answer, setAnswer] = useState(
    questionData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.character.character;
    }, "")
  );
  console.log(answer)
  console.log(questionData);
  useEffect(() => {
    axios.post(`${Backend_URL}/questions/random/input`, {
      wordBank: wordBank,
      answer: questionData,
      num: 4
    }).then((res) => {
      setInput(res.data.data)
    })
  },[questionData])
  console.log(input);
  console.log("-------Re-render--------")
   return (
     <>
       <div>
         <MiniCharacter />
       </div>
       <div></div>
       <button onClick={() => props.canSubmit(true)}>disable/enable</button>
     </>
   );
}

// //Functionality of question component,  will move it later
//   const add = (text) => {
//     const ans = [...answer, text];
//     const userInput = [...input];
//     const index = input.indexOf(text);
//     userInput.splice(index, 1);
//     setAnswer(ans);
//     setInput(userInput);
//   };
//   const remove = (text) => {
//     const ans = [...answer];
//     const userInput = [...input, text];
//     const index = answer.indexOf(text);
//     ans.splice(index, 1);
//     setAnswer(ans);
//     setInput(userInput);
//   };

//   const inputElement = input.map((x) => (
//     <Button
//       style={{ color: "green" }}
//       onClick={(e) => add(e.target.textContent)}
//     >
//       {x}
//     </Button>
//   ));
//   const answerElement = answer.map((x) => (
//     <Button
//       style={{ color: "red" }}
//       onClick={(e) => remove(e.target.textContent)}
//     >
//       {x}
//     </Button>
//   ));
