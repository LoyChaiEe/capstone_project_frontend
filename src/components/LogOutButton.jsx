import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOutBtn } from "./SVG";
import "./logButton.css";

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="log-button"
    >
      <LogOutBtn />
    </button>
  );
}
