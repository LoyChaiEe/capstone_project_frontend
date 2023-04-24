import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import { Howl } from "howler";
import "./voices.css";
import { Button } from "../components/Buttons";
import { Sound } from "../components/PNG";

export default function Voices() {
  const [voicevoxCharacters, setVoicevoxCharacters] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${Backend_URL}/voicevoxes/`).then((res) => {
        setVoicevoxCharacters(res.data);
      });
    } catch (err) {
      console.log("Error retrieving voicevox data", err);
    }
  }, []);

  const play = async (e) => {
    const speakerId = e.target.value;
    const button = e.target.closest("button");
    const text = button.getAttribute("data-value");
    const data = await createAudio(text, speakerId);
    const audioSRC = URL.createObjectURL(data);
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 2,
      format: "wav",
    });
    sound.play();
  };

  const displayVoicevoxCharacters = voicevoxCharacters.map(
    (voicevoxCharacter, index) => (
      <>
        <div className="voices-character-wrapper">
          <img
            src={voicevoxCharacter.full_body_image_url}
            alt={voicevoxCharacter.full_body_image_url}
            className="voices-character"
            key={index}
          />
          <div className="voices-character-lower">
            <div className="voices-character-lower-names">
              <h1 className="voices-character-japanese">
                {voicevoxCharacter.voicevox_character}
              </h1>
              <h2 className="voices-character-english">
                {voicevoxCharacter.voicevox_english}
              </h2>
            </div>
            <Button
              onClick={play}
              value={voicevoxCharacter.voicevox_voice}
              data-value={`こんにちは、私の名前は${voicevoxCharacter.voicevox_character}`}
            >
              <Sound />
            </Button>
          </div>
        </div>
      </>
    )
  );

  const createQuery = async (text, speakerId) => {
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=${speakerId}&text=${text}`
    );
    return response.data;
  };

  const createVoice = async (text, speakerId) => {
    const query = await createQuery(text, speakerId);
    const response = await axios.post(
      `http://localhost:50021/synthesis?speaker=${speakerId}`,
      query,
      { responseType: "blob" }
    );
    return response.data;
  };

  const createAudio = async (text, speakerId) => {
    const data = await createVoice(text, speakerId);
    return data;
  };

  return (
    <div className="voices-container">
      <h1 className="voices-title">VOICES</h1>
      <div className="voices-character-container">
        {displayVoicevoxCharacters}
      </div>
    </div>
  );
}
