import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL.js";
import { useAuth0 } from "@auth0/auth0-react";

export const VoiceContext = createContext();

export const VoiceContextProvider = (props) => {
  const [voiceData, setVoiceData] = useState([]);
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated)
      axios.get(`${Backend_URL}/voicevoxes`).then((res) => {
        setVoiceData(res.data);
      });
  }, [isAuthenticated]);

  return (
    <VoiceContext.Provider value={{ voiceData, setVoiceData }}>
      {props.children}
    </VoiceContext.Provider>
  );
};
