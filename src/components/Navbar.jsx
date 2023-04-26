import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { NavLogo, LessonPNG, CharacterPNG, ProfilePNG, VoicesPNG } from "./PNG";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar(userData) {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navbar">
      <Link to="/">
        <NavLogo />
      </Link>
      {isAuthenticated ? (
        <ul className="nav-link-container">
          <li className="nav-link-wrapper">
            <Link
              to="/lesson"
              className="nav-link-text-wrapper"
              state={{ type: `vocabs` }}
            >
              <LessonPNG />
              <span className="nav-link-text">LESSON</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/characters/display" className="nav-link-text-wrapper">
              <CharacterPNG />
              <span className="nav-link-text">CHARACTERS</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/profile/user" className="nav-link-text-wrapper">
              {isAuthenticated ? (
                <img
                  src={userData?.userData?.profile_pic_url}
                  alt={userData?.userData?.profile_pic_url}
                  className="nav-link-profile-image"
                />
              ) : (
                <ProfilePNG />
              )}

              <span className="nav-link-text">PROFILE</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/voicevox/voices" className="nav-link-text-wrapper">
              <VoicesPNG />
              <span className="nav-link-text">VOICES</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/about/landing" className="nav-link-text-wrapper">
              <VoicesPNG />
              <span className="nav-link-text">LANDING</span>
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
