import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";
import { SettingBtn } from "./PNG";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOutBtn } from "./PNG";
import { message, Popconfirm, ConfigProvider } from "antd";

export function Button(props) {
  return (
    <button className="button-wrapper" {...props} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function AdvancementButton(props) {
  return (
    <button
      className="advancement-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
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

export function TranslationButton(props) {
  return (
    <button
      className="translation-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function TranslationAnswerButton(props) {
  return (
    <button
      className="translation-answer-button-wrapper"
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
  const confirm = (e) => {
    message.success("Logging out");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#570344",
          colorPrimary: "#570344",
        },
      }}
    >
      <Popconfirm
        title="Log Out"
        description="Are you sure you want to log out?"
        onConfirm={confirm}
        showCancel="false"
        okText="Yes"
        cancelText="No"
      >
        <button className="log-button">
          <LogOutBtn />
        </button>
      </Popconfirm>
    </ConfigProvider>
  );
}

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
}
