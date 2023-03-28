import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import NavLogo from "./NavLogo";
import { HomeSVG, LessonSVG, CharacterSVG, ProfileSVG, AboutSVG } from "./SVG";

export default function Navbar() {
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
            <ProfileSVG />
            <span className="nav-link-text">PROFILE</span>
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
