import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/userContex";

export default function RootLayout() {
  const { userData, setUserData } = useContext(UserContext);
  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Outlet context={[userData, setUserData]} />
      </div>
    </div>
  );
}
