import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function About() {
  const [voices, setVoices] = useState("");
  useEffect(() => {
    axios.get(`${Backend_URL}/voicevoxes/`).then((response) => {
      setVoices(response.data);
    });
  }, []);

  return (
    <div>
      <span>ABOUT</span>
      <select>
        {voices &&
          voices.map((voice, index) => (
            <option value={voice.id} key={index}>
              {voice.id}
            </option>
          ))}
      </select>
    </div>
  );
}
