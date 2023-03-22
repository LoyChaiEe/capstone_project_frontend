import React from "react";
import "./navlogo.css";

export default function NavLogo() {
  return (
    <img
      src={require("../assets/home-logo-500.png")}
      className="nav-logo"
      alt="nav-logo"
    />
  );
}
