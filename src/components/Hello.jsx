import React, { useState } from "react";
import axios from "axios";

function AudioPlayer() {
  const [text, setText] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  const handleSendClick = async () => {
    const data = await createAudio(text);
    setAudioSrc(URL.createObjectURL(data));
  };

  const createQuery = async (text) => {
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=1&text=${text}`
    );
    return response.data;
  };

  const createVoice = async (text) => {
    const query = await createQuery(text);
    const response = await axios.post(
      "http://localhost:50021/synthesis?speaker=1",
      query,
      { responseType: "blob" }
    );
    return response.data;
  };

  const createAudio = async (text) => {
    const data = await createVoice(text);
    return data;
  };
  console.log("hello")

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSendClick}>Send</button>
      <audio className="audio" src={audioSrc} controls />
    </div>
  );
}

export default AudioPlayer;
