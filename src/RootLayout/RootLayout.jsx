import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import "./rootLayout.css";

export default function RootLayout() {
  const { userData, setUserData, setIsUserDataUpdated } =
    useContext(UserContext);

  return (
    <div className="app">
      <Navbar userData={userData} />
      <div className="app-body">
        <Outlet context={[userData, setUserData, setIsUserDataUpdated]} />
      </div>
    </div>
  );
}
