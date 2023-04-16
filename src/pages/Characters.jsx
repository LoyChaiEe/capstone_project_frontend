import React, { useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import "./characters.css";
import { Howl } from "howler";
import { MiniCharacter } from "../components/SVG";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Button } from "../components/Buttons";
import { useOutletContext } from "react-router-dom";

const getter = (url) => axios.get(url).then((res) => res.data);

export default function Characters() {
  const [userData] = useOutletContext();
  const [characterType, setCharacterType] = useState("hiragana");
  const { data: characters, mutate: refetch } = useSWR(
    `${Backend_URL}/characters/${characterType}`,
    getter
  );
  const changeCharacterType = (type) => {
    setCharacterType(type);
    refetch();
  };
  const characterType_cap = characterType.replace(/^\w/, (c) =>
    c.toUpperCase()
  );

  const speaker = userData.voicevox_id;
  const play = async (e) => {
    console.log(e.target);
    const text = e.target.textContent;
    // console.log(text);
    const data = await createAudio(text);
    const audioSRC = URL.createObjectURL(data);
    // console.log(audioSRC);
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 1,
      format: "wav",
    });
    sound.play();
  };

  const displayBasic = characters?.basic.map((row, index) => {
    return row.map((ele, rowIndex) => {
      if (ele === null) {
        return (
          <div
            className="character-wrapper-empty"
            key={`${index}-${rowIndex}`}
          ></div>
        );
      } else {
        return (
          <div
            className="character-wrapper"
            key={`${index}-${rowIndex}`}
            onClick={play}
          >
            <span className="character">{ele.character}</span>
            <div className="character-lower-wrapper">
              <span className="pronounciation">{ele.pronounciation}</span>
            </div>
          </div>
        );
      }
    });
  });
  const displayDakuon = characters?.dakuon.map((row, index) => {
    return row.map((ele, rowIndex) => {
      if (ele === null) {
        return (
          <div className="character-wrapper" key={`${index}-${rowIndex}`}></div>
        );
      } else {
        return (
          <div
            className="character-wrapper"
            key={`${index}-${rowIndex}`}
            onClick={() => soundPlay(ele.audio_url)}
          >
            <div className="character">{ele.character}</div>
            <div className="character-lower-wrapper">
              <div className="pronounciation">{ele.pronounciation}</div>
            </div>
          </div>
        );
      }
    });
  });

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
    });
    sound.play();
  };

  const createQuery = async (text) => {
    //change speaker query to the id of the waifu
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
    <div className="character-section">
      <div className="character-container">
        <div className="character-selection-title">
          <div
            className={characterType === "hiragana" ? "active" : "inactive"}
            onClick={() => changeCharacterType("hiragana")}
          >
            <h1 className="selection-title">Hiragana</h1>
          </div>
          <div
            className={characterType === "katakana" ? "active" : "inactive"}
            onClick={() => changeCharacterType("katakana")}
          >
            <h1>Katakana</h1>
          </div>
        </div>
        <>
          <div className="character-title">
            <MiniCharacter />
            <div className="character-title-text">
              <span className="character-title-title">{characterType_cap}</span>
              <p className="character-title-description">Basic Symbols</p>
              <p className="character-instruction">
                (click on the cards to listen to its pronounciation)
              </p>
              <Link
                to={`/characters/${characterType}/lesson`}
                state={{ type: `${characterType}` }}
              >
                <Button id="character-button">
                  Let's learn {characterType_cap}!
                </Button>
              </Link>
            </div>
          </div>
          <div className="character-grid">{displayBasic}</div>
          <div className="character-title">
            <MiniCharacter />
            <div className="character-title-text">
              <h1 className="character-title-title">Dakuon</h1>
              <p className="character-instruction">
                Addition of a symbol changes the pronounciation
              </p>
            </div>
          </div>
          <div className="character-grid">{displayDakuon}</div>
        </>
      </div>
    </div>
  );
}
