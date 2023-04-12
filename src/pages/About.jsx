import React, { useState } from "react";
import axios from "axios";
import { Input } from "antd";
import { Howl } from "howler";
import { Buffer } from "buffer";

export default function About() {
  const [inputText, setInputText] = useState("");
  const [queryJson, setQueryJson] = useState("");
  const [audioData, setAudioData] = useState();

  const createQuery = async () => {
    const res = await axios.post(
      `http://localhost:50021/audio_query?text=${inputText}&speaker=1`
    );
    if (!res) return;
    setQueryJson(res.data);
    console.log("1");
  };

  const createVoice = async () => {
    const res = await axios.post(
      "http://localhost:50021/synthesis?speaker=1",
      queryJson
    );

    // if (!res) return;
    // console.log(res);
    const wavString = res.data;
    const len = wavString.length;
    console.log("len", len);
    const buf = new ArrayBuffer(len);
    const view = new Uint8Array(buf);
    for (var i = 0; i < len; i++) {
      view[i] = wavString.charCodeAt(i) & 0xff;
    }
    console.log("view", view);
    const blob = new Blob([view], { type: "audio/wav" });
    // const blob = new Blob([...res.data], { type: "audio/wav" });
    console.log("blob", blob);
    const blobUrl = URL.createObjectURL(blob);
    console.log("blobUrl", blobUrl);
    setAudioData(blobUrl);
    console.log("2");
  };

  // console.log("audioData", audioData);

  // const audio = new Audio(audioData);

  const soundPlay = (src) => {
    // const base64 = Buffer.from(audioData);
    // const sound = new Howl({
    //   src: audioData,
    //   html5: true,
    //   preload: true,
    // });
    // sound.play();
    console.log("3");
  };

  return (
    <div>
      <span>ABOUT</span>
      {/* <button onClick={handleClick}>Press</button> */}
      <h1>type here</h1>
      <Input
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={createQuery}>query</button>
      <button onClick={createVoice}>voice</button>
      {/* <button onClick={() => audio.play()}>Play</button> */}
      {audioData && <audio controls src={audioData}></audio>}
      {/* <button
        onClick={() => {
          soundPlay();
        }}
      >
        play
      </button> */}
    </div>
  );
}
