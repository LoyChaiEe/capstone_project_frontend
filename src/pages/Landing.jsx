import React, { useState, useEffect } from "react";
import "./landing.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, LogoutButton } from "../components/Buttons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export default function Landing() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
  };

  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated) {
        console.log(isAuthenticated);
        const userInfo = {
          username: user?.nickname,
          first_name: user?.given_name || user?.name,
          last_name: user?.family_name || "",
          email_address: user?.email,
          profile_pic_url: user?.picture,
          voicevox_id: 1,
        };
        try {
          // get access token
          const accessToken = await getAccessTokenSilently({
            audience: `${audience}`,
            scope: `${scope}`,
          });
          console.log(accessToken);
          console.log(userInfo);
          await axios.post(`${Backend_URL}/users/newUser`, userInfo, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } catch (err) {
          console.log(userInfo);
          console.log("Axios post to BE error", err);
        }
        console.log(userInfo);
      }
    };
    createUser();
  }, [getAccessTokenSilently, isAuthenticated, user]);

  const displayVoicevoxCharacters = voicevoxCharacters.map(
    (voicevoxCharacter, index) => (
      <img
        src={voicevoxCharacter.face_image_url}
        alt={voicevoxCharacter.face_image_url}
        className="voicevox-characters"
        key={index}
      />
    )
  );

  return (
    <div className="landing-container">
      <LogoutButton />
      <div className="landing-hero-section">
        <div className="landing-hero-text-container">
          <h1 className="landing-hero-title">
            Better way to Learn
            <br />
            With a Waifu
          </h1>
          <h2 className="landing-hero-para">
            Learning Japanese alone might be difficult but with a Waifu, getting
            the hang of Japanese is made easier
          </h2>
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <Link to="/lesson" className="link-text-wrapper">
              <Button>Start Learning</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="landing-section-two">
        <h1 className="landing-hero-title">
          CHOOSE YOUR DESIRED <br /> WAIFU VOICE
        </h1>
        <h2 className="landing-hero-para">
          There are many individuals who desire to learn Japanese with their
          special waifu. This app gives you a selection of waifu voices for you
          to pick as you go through each lesson.
        </h2>
        <div className="voicevox-character-wrapper">
          {displayVoicevoxCharacters}
        </div>
        <Link to="/voicevox/voices" className="link-text-wrapper">
          <Button>Check Out Waifu</Button>
        </Link>
      </div>
    </div>
  );
}
