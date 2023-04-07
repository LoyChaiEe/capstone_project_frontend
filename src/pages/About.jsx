import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function About() {
  const [userData] = useOutletContext();
  console.log("CHATROOM INDEX", userData);
  return (
    <div>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <span>ABOUT</span>
      <Outlet />
    </div>
  );
}
