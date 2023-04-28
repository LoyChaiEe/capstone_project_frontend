import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import "./characters.css";
import { Howl } from "howler";
import { MiniCharacter } from "../components/PNG";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Button } from "../components/Buttons";
import { useOutletContext } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function Characters() {
  const { getAccessTokenSilently } = useAuth0();
  const [userData] = useOutletContext();
  const [characterType, setCharacterType] = useState("hiragana");
  const [speaker, setSpeaker] = useState("");
  const [latestLesson, setLatestLesson] = useState("");
  const [wordBank, setWordBank] = useState([]);

  useEffect(() => {
    const voicevoxVoice = async () => {
      await axios
        .get(`${Backend_URL}/voicevoxes/speaker/${userData?.voicevox_id}`)
        .then((res) => {
          setSpeaker(res.data?.voicevox_voice);
        });
    };
    voicevoxVoice();
    const getLatestLesson = async () => {
      await axios
        .get(`${Backend_URL}/userLesson/${characterType}/${userData.id}`)
        .then((res) => {
          setLatestLesson(res.data);
        });
    };
    getLatestLesson();
  }, [userData, characterType, latestLesson]);

  useEffect(() => {
    const getUserWordBank = async () => {
      await axios
        .post(`${Backend_URL}/userWordbank/${characterType}/${userData?.id}`)
        .then((res) => {
          const uniqueArr = res.data.filter((obj, index, self) => {
            return (
              index ===
              self.findIndex((t) => t.character_id === obj.character_id)
            );
          });
          setWordBank(uniqueArr);
        });
    };
    getUserWordBank();
  }, [characterType, userData]);

  const getter = async (url) => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: `${scope}`,
    });

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

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

  const play = async (e) => {
    const button = e.target.closest("button");
    if (button) {
      const text = button.getAttribute("data-value");
      const data = await createAudio(text);
      const audioSRC = URL.createObjectURL(data);
      const sound = new Howl({
        src: [audioSRC],
        autoplay: false,
        loop: false,
        volume: 2,
        format: "wav",
      });
      sound.play();
    }
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
          <button
            className="character-wrapper"
            key={`${index}-${rowIndex}`}
            onClick={play}
            data-value={ele.character}
          >
            <span className="character">{ele.character}</span>
            <span className="pronounciation">{ele.pronounciation}</span>
          </button>
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
          <button
            className="character-wrapper"
            key={`${index}-${rowIndex}`}
            onClick={play}
            data-value={ele.character}
          >
            <span className="character">{ele.character}</span>
            <span className="pronounciation">{ele.pronounciation}</span>
          </button>
        );
      }
    });
  });

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
              state={{
                type: `${characterType}`,
                lesson_id: `${latestLesson}`,
                wordBank: wordBank,
              }}
              className="link-wrapper"
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
  );
}
