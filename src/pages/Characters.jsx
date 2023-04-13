import React, { useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import "./characters.css";
import { Howl } from "howler";
import { MiniCharacter } from "../components/SVG";
import { Link } from "react-router-dom";
import useSWR from "swr";
const getter = (url) => axios.get(url).then((res) => res.data);

export default function Characters() {
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

  const displayBasic = characters?.basic.map((row) => {
    return row.map((ele, i) => {
      if (ele === null) {
        return <div className="character-wrapper-empty" key={i}></div>;
      } else {
        return (
          <div
            className="character-wrapper"
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
  const displayDakuon = characters?.dakuon.map((row) => {
    return row.map((ele) => {
      if (ele === null) {
        return <div className="character-wrapper"></div>;
      } else {
        return (
          <div
            className="character-wrapper"
            key={ele.id}
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
              <h1 className="character-title-title">{characterType_cap}</h1>
              <p className="character-title-description">Basic Symbols</p>
              <p className="character-instruction">
                (click on the cards to listen to its pronounciation)
              </p>
              <Link
                to={`${characterType}/lesson`}
                state={{ type: `${characterType}` }}
              >
                <button>Let's learn {characterType_cap}!</button>
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
