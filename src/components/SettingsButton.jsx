import React from "react";
import { Link } from "react-router-dom";
import { SettingBtn } from "./SVG";
import "./settingsButton.css";

export default function SettingsButton() {
  return (
    <div>
      <Link to="/profile/edit" className="settings-btn">
        <SettingBtn />
      </Link>
    </div>
  );
}
