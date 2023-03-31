import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import NavLogo from "./NavLogo";
import { HomeSVG, LessonSVG, CharacterSVG, ProfileSVG, AboutSVG } from "./SVG";
import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import { Backend_URL } from "../BACKEND_URL.js";

export default function Navbar() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState({});

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  useEffect(() => {
    const getUserMetaData = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
      try {
        const accessToken = await getAccessTokenSilently({
          // authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:users",
          // },
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("metadata response", metadataResponse);
        const { user_metadata } = await metadataResponse.json();
        console.log("user_metadata", user_metadata);
        setUserMetadata(user_metadata);
        console.log(
          "authenticated",
          isAuthenticated,
          "user",
          user,
          "metadata",
          userMetadata,
          "user.sub",
          user.sub
        );
      } catch (err) {
        console.log("error", err.message);
      }
    };
    // if (isAuthenticated) {
    //   const userInfo = {
    //     username: user?.nickname,
    //     first_name: user?.given_name,
    //     last_name: user?.family_name,
    //     email_address: user?.email,
    //     profile_pic_url: user?.picture,
    //   };
    //   console.log("step 2");
    //   axios
    //     .post(`${Backend_URL}/users/newUser`, userInfo, console.log("step 3"))
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    getUserMetaData();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <div className="navbar">
      <Link to="/">
        <NavLogo />
      </Link>
      {isAuthenticated ? (
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
          <li className="nav-link-wrapper">
            <Link to="/landing" className="nav-link-text-wrapper">
              <AboutSVG />
              <span className="nav-link-text">LANDING</span>
            </Link>
          </li>
        </ul>
      ) : (
        LoginButton()
      )}
    </div>
  );
}
