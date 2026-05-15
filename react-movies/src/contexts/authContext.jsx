import React, { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const existingUserName = localStorage.getItem("userName");

  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState(existingUserName || "");

 const setToken = (token, username) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", username);
  setAuthToken(token);
  setUserName(username);
};
  const authenticate = async (username, password) => {
    const result = await login(username, password);

    if (result.token) {
      setToken(result.token);
      sesetToken(result.token, username);
       setIsAuthenticated(true);
    }

    return false;
  };

  const register = async (username, password) => {
  const result = await signup(username, password);
  return result.success === true;
};

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        authenticate,
        register,
        signout,
        userName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;