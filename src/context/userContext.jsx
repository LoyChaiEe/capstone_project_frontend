import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Backend_URL } from "../BACKEND_URL.js";

export const UserContext = createContext();
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

export const UserContextProvider = (props) => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [allUserData, setAllUserData] = useState([]);
  const [isUserDataUpdated, setIsUserDataUpdated] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const { email } = user;
      setUserEmail(email);
    }
  }, [user, isAuthenticated, isLoading]);

  // I don't recommend writing such if-else spaghetti. Even more so in a single useEffect. This effect has too many different functions, which violates the single responsibility principle. This will sooner or later lead to bugs, as this type of function is not extendable very easily as well. Can read up on SOLID principle, and see how these criteria work for this function. Then can possibly deconstruct it into multiple side effects or functions.
  useEffect(() => {
    const findOrAddUser = async () => {
      if (userEmail) {
        await axios
          .get(`${Backend_URL}/users/${userEmail}`)
          .then((response) => {
            setUserData(response.data);
          });
      } else if (isAuthenticated) { // wouldn't userEmail always be defined when someone is authenticated? That would mean the first if statement will always run
        const createUser = async () => {
          const userInfo = {
            username: user?.nickname,
            first_name: user?.given_name || user?.name,
            last_name: user?.family_name || "",
            email_address: user?.email,
            profile_pic_url: user?.picture,
            voicevox_id: 1,
          };
          try {
            // get access token
            const accessToken = await getAccessTokenSilently({
              audience: `${audience}`,
              scope: `${scope}`,
            });
            await axios
              .post(`${Backend_URL}/users/newUser`, userInfo, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((res) => {
                setUserData(res.data);
              });
          } catch (err) {
            console.log("Axios post to BE error", err);
          }
        };
        createUser();
      } else if (isUserDataUpdated === true) {
        // wouldn't you need to set it to false again, otherwise it will always run this if block here if above is not fulfilled?
        axios.get(`${Backend_URL}/users/${userEmail}`).then((response) => {
          setUserData(response.data);
        });
      } else {
        setIsUserDataUpdated(false);
      }
    };
    findOrAddUser();
  }, [
    user,
    userEmail,
    getAccessTokenSilently,
    isAuthenticated,
    isUserDataUpdated,
  ]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      try {
        axios.get(`${Backend_URL}/users`).then((response) => {
          setAllUserData(response.data);
        });
      } catch (error) {
        console.log("Axios get all users error", error);
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <UserContext.Provider
      value={{
        userData,
        allUserData,
        setUserData,
        setIsUserDataUpdated,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
