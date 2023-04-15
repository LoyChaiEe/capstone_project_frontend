import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function About() {
  const [voices, setVoices] = useState("");
  useEffect(() => {
    axios.get(`${Backend_URL}/voicevoxes/`).then((response) => {
      setVoices(response.data);
      console.log(voices);
      console.log(response);
    });
  }, []);
  return (
    <div>
      <span>ABOUT</span>
    </div>
  );
}
