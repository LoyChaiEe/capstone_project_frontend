import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import NavLogo from "./NavLogo";
import { HomeSVG, LessonSVG, CharacterSVG, ProfileSVG, AboutSVG } from "./SVG";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="navbar">
      <Link to="/">
        <NavLogo />
      </Link>
      <ul className="nav-link-container">
        <li className="nav-link-wrapper">
          <Link to="/" className="nav-link-text-wrapper">
            <HomeSVG />
            <span className="nav-link-text">HOME</span>
          </Link>
        </li>
        <li className="nav-link-wrapper">
          <Link to="/lesson" className="nav-link-text-wrapper">
            <LessonSVG />
            <span className="nav-link-text">LESSON</span>
          </Link>
        </li>
        <li className="nav-link-wrapper">
          <Link to="/characters" className="nav-link-text-wrapper">
            <CharacterSVG />
            <span className="nav-link-text">CHARACTERS</span>
          </Link>
        </li>
        <li className="nav-link-wrapper">
          <Link to="/profile" className="nav-link-text-wrapper">
            {isAuthenticated ? (
              <img
                src={user.picture}
                alt={user.name}
                className="nav-link-profile-image"
              />
            ) : (
              <ProfileSVG />
            )}

            <span className="nav-link-text">PROFILE</span>
          </Link>
        </li>
        <li className="nav-link-wrapper">
          <Link to="/edit-profile" className="nav-link-text-wrapper">
            <ProfileSVG />
            <span className="nav-link-text">EDIT PROFILE</span>
          </Link>
        </li>
        <li className="nav-link-wrapper">
          <Link to="/about" className="nav-link-text-wrapper">
            <AboutSVG />
            <span className="nav-link-text">ABOUT</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
