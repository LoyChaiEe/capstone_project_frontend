import React from "react";
import "./landing.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components/Buttons";
import { Link } from "react-router-dom";

export default function Landing() {
  const { isAuthenticated } = useAuth0();
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <Button onClick={() => loginWithRedirect()}>Start Learning</Button>;
  };
  return (
    <div className="landing-container">
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
          <Link to="/home">
            <Button>hi</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
