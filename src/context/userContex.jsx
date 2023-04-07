import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Backend_URL } from "../BACKEND_URL.js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [allUserData, setAllUserData] = useState([]);
  const [isUserDataUpdated, setIsUserDataUpdated] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const { email } = user;
      setUserEmail(email);
    }
  }, [user, isAuthenticated]);
  console.log(userEmail);

  useEffect(() => {
    if (userEmail) {
      axios.get(`${Backend_URL}/users/${userEmail}`).then((response) => {
        setUserData(response.data);
        console.log("HELLO", userEmail);
      });
    }
    if (isUserDataUpdated === true) {
      axios.get(`${Backend_URL}/users/${userEmail}`).then((response) => {
        setUserData(response.data);
        console.log("HELLO", userEmail);
      });
    } else {
      setIsUserDataUpdated(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log("THIS IS REQUEST");
      try {
        axios.get(`${Backend_URL}/users`).then((response) => {
          setAllUserData(response.data);
        });
      } catch (error) {
        console.log("ERROR HERE", error);
      }
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ userData, allUserData, setUserData, setIsUserDataUpdated }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
