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

  useEffect(() => {
    const findOrAddUser = async () => {
      if (userEmail) {
        await axios
          .get(`${Backend_URL}/users/${userEmail}`)
          .then((response) => {
            setUserData(response.data);
          });
      } else if (isAuthenticated) {
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
        axios.get(`${Backend_URL}/users/${userEmail}`).then((response) => {
          setUserData(response.data);
          console.log(response.data);
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
