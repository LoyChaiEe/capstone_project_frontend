import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/userContex";

export default function RootLayout() {
  const { userData, setUserData, setIsUserDataUpdated } =
    useContext(UserContext);
  console.log("hey", setIsUserDataUpdated);
  return (
    <div className="app">
      <Navbar userData={userData} />
      <div className="app-body">
        <Outlet context={[userData, setUserData, setIsUserDataUpdated]} />
      </div>
    </div>
  );
}
