import React, { useEffect, useState } from "react";
import { MiniCharacter } from "../SVG";
import "./matching.css";
import { Button } from "antd";
import axios from "axios";
import { Howl } from "howler";
import { Backend_URL } from "../../BACKEND_URL";
const soundPlay = (src) => {
  const sound = new Howl({
    src,
    html5: true,
    preload: true,
  });
  sound.play();
};

export default function Recognition(props) {
  /* Things need to do in this component:
     1. data retreival
     2. Display question and input -> post to backend for randomGeneration
     3. State to keep track of input
     4. Audio play
     5. verify correct input
  */

  //Data Retreival
  const questionData = props.questionData;
  const wordBank = props.wordBank
  const [inputData, setInputData] = useState([])
  //Retrieve random input
  useEffect(() => {
    axios
      .post(`${Backend_URL}/questions/recognition/input`, {
        questionData: questionData,
        wordBank: wordBank
      })
      .then((res) => {
        console.log(res.data);
        setInputData(res.data)
      });
  }, [questionData]);

  //Play sounds
  const soundPlay = async(e) => {
    //retrieve the id of the button
    const text = e.target.textContent
    const choiceData = inputData?.find(obj => obj.character === text || obj.pronounciation === text);
    const wordtoplay = choiceData.character
    console.log(wordtoplay)
    const data = await createAudio(wordtoplay);
    const audioSRC = URL.createObjectURL(data);
    console.log(audioSRC)
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 1,
      format: "wav"
    });
    sound.play();
  }

  const createQuery = async (text) => {
    //change speaker query to the id of the waifu
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=3&text=${text}`
    );
    return response.data;
  };

  const createVoice = async (text) => {
    const query = await createQuery(text);
    const response = await axios.post(
      "http://localhost:50021/synthesis?speaker=3",
      query,
      { responseType: "blob" }
    );
    return response.data;
  };

  const createAudio = async (text) => {
    const data = await createVoice(text);
    return data;
  };




  const inputDisplay = inputData.map((ele, i) => {
    const word = ele.character
    const pronounciation = ele.pronounciation
    const type = questionData.question_type.split("-")
    return <Button value={i} onClick={soundPlay}>{type[1] === "character" ? pronounciation : word}</Button>
  })

  console.log(questionData);

  return (
    <>
      <div>
        <MiniCharacter />
        <span>{questionData.question}</span>
      </div>
      <div>{inputDisplay}</div>
      <button onClick={() => props.canSubmit(true)}>disable/enable</button>
    </>
  );
}
