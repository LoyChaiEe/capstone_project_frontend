import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import "./characters.css";
import { Howl } from "howler";

export default function Characters() {
  const [hiraganaBasic, setHiraganaBasic] = useState([]);
  const [hiraganaDakuon, setHiraganaDakuon] = useState([]);
  const [katakanaBasic, setKatakanaBasic] = useState([]);
  const [katakanaDakuon, setKatakanaDakuon] = useState([]);
  const [characterDisplay, setCharacterDisplay] = useState(null);

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
    e.preventDefault();
    const hiraganaCharacters = (
      <>
        <h1>Hiragana Basic</h1>
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
        <h1>Hiragana Dakuon</h1>
        <div className="hirgana-basic-grid">
          {hiraganaDakuonData &&
            hiraganaDakuonData.map((i) => (
              <div className="character-wrapper" key={i.id}>
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
    e.preventDefault();
    const katakanaCharacters = (
      <>
        <h1>Katakana Basic</h1>
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
        <h1>Katakana Dakuon</h1>
        <div className="hirgana-basic-grid">
          {katakanaDakuonData &&
            katakanaDakuonData.map((i) => (
              <div className="character-wrapper" key={i.id}>
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
          <div className="character-selection" onClick={handleHiragana}>
            <h1>Hiragana</h1>
          </div>
          <div className="character-selection" onClick={handleKatakana}>
            <h1>Katakana</h1>
          </div>
        </div>
        {characterDisplay}
      </div>
    </div>
  );
}
