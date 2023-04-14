import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";
import { SettingBtn } from "./SVG";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOutBtn } from "./SVG";

export function Button(props) {
  return (
    <button className="button-wrapper" {...props} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function QuestionButton(props) {
  return (
    <button
      className="question-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function SettingsButton() {
  return (
    <div>
      <Link to="/profile/edit" className="settings-btn">
        <SettingBtn />
      </Link>
    </div>
  );
}

export function LogoutButton() {
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
