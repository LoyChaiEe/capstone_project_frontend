import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Outlet />
      </div>
    </div>
  );
}
