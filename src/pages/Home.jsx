import React from "react";
import "./home.css";
import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from "../components/UserInfo";

export default function Home() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    );
  };

  return (
    <div className="home-section">
      <div className="home-container">
        <span>HOME</span>
        {LoginButton()}
        <UserInfo />
        {LogoutButton()}
      </div>
    </div>
  );
}
