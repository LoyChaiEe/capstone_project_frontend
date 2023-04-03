import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import "./characters.css";
import { Howl } from "howler";
import { MiniCharacter } from "../components/SVG";

export default function Characters() {
  const [hiraganaBasic, setHiraganaBasic] = useState([]);
  const [hiraganaDakuon, setHiraganaDakuon] = useState([]);
  const [katakanaBasic, setKatakanaBasic] = useState([]);
  const [katakanaDakuon, setKatakanaDakuon] = useState([]);
  const [characterDisplay, setCharacterDisplay] = useState(null);
  const [isHiraganaActive, setIsHiraganaActive] = useState(true);
  const [isKatakanaActive, setIsKatakanaActive] = useState(false);

  useEffect(() => {
    const getWords = async () => {
      try {
        const hiragana_basic = await axios.get(
          `${Backend_URL}/words/hiraganaBasic`
        );
        setHiraganaBasic(hiragana_basic);
        const hiragana_dakuon = await axios.get(
          `${Backend_URL}/words/hiraganaDakuon`
        );
        setHiraganaDakuon(hiragana_dakuon);
        const katakana_basic = await axios.get(
          `${Backend_URL}/words/katakanaBasic`
        );
        setKatakanaBasic(katakana_basic);
        const katakana_dakuon = await axios.get(
          `${Backend_URL}/words/katakanaDakuon`
        );
        setKatakanaDakuon(katakana_dakuon);
      } catch (error) {
        console.log("error", error);
      }
    };
    getWords();
  }, []);

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
    });
    sound.play();
  };

  const hiraganaBasicsData = hiraganaBasic.data;
  const hiraganaDakuonData = hiraganaDakuon.data;
  const katakanaBasicsData = katakanaBasic.data;
  const katakanaDakuonData = katakanaDakuon.data;

  const handleHiragana = async (e) => {
    setIsHiraganaActive(true);
    setIsKatakanaActive(false);
    const hiraganaCharacters = (
      <>
        <div className="character-title">
          <MiniCharacter />
          <div className="character-title-text">
            <h1 className="character-title-title">Hiragana</h1>
            <p className="character-title-description">Basic Symbols</p>
            <p className="character-instruction">
              (click on the cards to listen to its pronounciation)
            </p>
            <button>Let's learn Hiragana!</button>
          </div>
        </div>
        <div className="hirgana-basic-grid">
          {hiraganaBasicsData &&
            hiraganaBasicsData.map((i) => (
              <div
                className="character-wrapper"
                key={i.id}
                onClick={() => soundPlay(i.audio_url)}
              >
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="character-title">
          <MiniCharacter />
          <div className="character-title-text">
            <h1 className="character-title-title">Dakuon</h1>
            <p className="character-instruction">
              Addition of a symbol changes the pronounciation
            </p>
          </div>
        </div>
        <div className="hirgana-basic-grid">
          {hiraganaDakuonData &&
            hiraganaDakuonData.map((i) => (
              <div
                className="character-wrapper"
                key={i.id}
                onClick={() => soundPlay(i.audio_url)}
              >
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
    return setCharacterDisplay(hiraganaCharacters);
  };

  const handleKatakana = async (e) => {
    setIsHiraganaActive(false);
    setIsKatakanaActive(true);
    const katakanaCharacters = (
      <>
        <div className="character-title">
          <MiniCharacter />
          <div className="character-title-text">
            <h1 className="character-title-title">Katakana</h1>
            <p className="character-title-description">Basic Symbols</p>
            <p className="character-instruction">
              (click on the cards to listen to its pronounciation)
            </p>
            <button>Let's learn Katakana!</button>
          </div>
        </div>
        <div className="hirgana-basic-grid">
          {katakanaBasicsData &&
            katakanaBasicsData.map((i) => (
              <div
                className="character-wrapper"
                key={i.id}
                onClick={() => soundPlay(i.audio_url)}
              >
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="character-title">
          <MiniCharacter />
          <div className="character-title-text">
            <h1 className="character-title-title">Dakuon</h1>
            <p className="character-instruction">
              Addition of a symbol changes the pronounciation
            </p>
          </div>
        </div>
        <div className="hirgana-basic-grid">
          {katakanaDakuonData &&
            katakanaDakuonData.map((i) => (
              <div
                className="character-wrapper"
                key={i.id}
                onClick={() => soundPlay(i.audio_url)}
              >
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
    return setCharacterDisplay(katakanaCharacters);
  };

  return (
    <div className="character-section">
      <div className="character-container">
        <div className="character-selection-title">
          <div
            className={isHiraganaActive ? "active" : "inactive"}
            onClick={handleHiragana}
          >
            <h1 className="selection-title">Hiragana</h1>
          </div>
          <div
            className={isKatakanaActive ? "active" : "inactive"}
            onClick={handleKatakana}
          >
            <h1>Katakana</h1>
          </div>
        </div>
        {characterDisplay}
      </div>
    </div>
  );
}
