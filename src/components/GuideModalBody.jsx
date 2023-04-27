import React, { useEffect, useState } from "react";
import "./guideModalBody.css";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import { useOutletContext } from "react-router-dom";
import { Howl } from "howler";

export default function GuideModalBody() {
  const [lessonWords, setLessonWords] = useState([]);
  const [userData] = useOutletContext();

  const speaker = userData.voicevox_id;

  useEffect(() => {
    try {
      axios.get(`${Backend_URL}/LQA/lesson/words/${1}`).then((res) => {
        setLessonWords(res.data);
      });
    } catch (err) {
      console.log("Error retrieving words from lesson", err);
    }
  }, []);

  const play = async (e) => {
    const text = e.target.textContent;
    console.log(text);
    const data = await createAudio(text);
    const audioSRC = URL.createObjectURL(data);
    console.log(audioSRC);
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 1,
      format: "wav",
    });
    sound.play();
  };

  const createQuery = async (text) => {
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=${speaker}&text=${text}`
    );
    return response.data;
  };

  const createVoice = async (text) => {
    const query = await createQuery(text);
    const response = await axios.post(
      `http://localhost:50021/synthesis?speaker=${speaker}`,
      query,
      { responseType: "blob" }
    );
    return response.data;
  };

  const createAudio = async (text) => {
    const data = await createVoice(text);
    return data;
  };

  return (
    <div>
      <h1 className="modal-title">Words in Lesson 1!</h1>
      <p className="modal-para">Click on the words to hear how they sound</p>
      <div className="words-lesson-wrapper">
        {lessonWords.map((words, index) => {
          return (
            <button onClick={play} key={index} className="words-lesson">
              {words.character.character}
            </button>
          );
        })}
      </div>
    </div>
  );
}
