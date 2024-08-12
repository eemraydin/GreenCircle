import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  getUser,
  login,
  register,
  removeToken,
} from "../services/auth";
import * as SecureStore from "expo-secure-store";
import { createPreferences, getPreferences } from "../services/preferences";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPreferences, setUserPreferences] = useState();

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        const response = await getUser();
        setUserId(response.user._id);
        setUserName(response.user.name);
        setUserEmail(response.user.email);
        setTokenState(storedToken);
        // console.log(userId, "this is the user id");
        // console.log(userName, "this is the user name");
        // console.log(userEmail, "this is the user email");
        // console.log(storedToken, "this is the stored token");
        // try {
        //   const pref = await getPreferences();
        //   setUserPreferences(pref);
        // } catch (error) {
        //   console.error(
        //     "No preferences found, creating default preferences.",
        //     error
        //   );

        //   const defaultPreferences = {
        //     location: true,
        //     notifications: true,
        //     dataCollection: true,
        //   };
        //   const newPreferences = await createPreferences(defaultPreferences);
        //   setUserPreferences(newPreferences || defaultPreferences);
        // }
        try {
          if (!userPreferences) {
            const defaultPreferences = {
              location: true,
              notifications: true,
              dataCollection: true,
            };
            const newPreferences = await createPreferences(defaultPreferences);
            setUserPreferences(newPreferences || defaultPreferences);
          }
          const pref = await getPreferences();
          setUserPreferences(pref);
        } catch (error) {
          console.error(
            "No preferences found, creating default preferences.",
            error
          );

          const defaultPreferences = {
            location: true,
            notifications: true,
            dataCollection: true,
          };
          const newPreferences = await createPreferences(defaultPreferences);
          setUserPreferences(newPreferences || defaultPreferences);
        }
      }
      setInitialized(true);
    };
    loadToken();
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const result = await login(email, password);

      const userData = await SecureStore.getItemAsync("user");
      console.log(userData, "this is the user data");
      // setUserId(result.data.user._id);
      setTokenState(result.data.token);
      // setUserName(result.user.name);
      // setUserEmail(result.user.email);
      setUserId(userData._id);
      setUserName(userData.name);
      setUserEmail(userData.email);

      // console.log(result.data.token, "this is the JWT");
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const result = await register(name, email, password);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await removeToken();
      setTokenState(null);
    } catch (error) {
      console.error("An error occurred while logging out.", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        token,
        onLogin: handleLogin,
        onRegister: handleRegister,
        onLogout: handleLogout,
        userId,
        userName,
        userEmail,
        setUserName,
        userPreferences,
        setUserPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
