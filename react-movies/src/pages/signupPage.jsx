import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignupPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);

  const signup = async () => {
    setErrorMessage("");

    if (!userName || !password) {
      setErrorMessage("Please enter a username and password.");
      return;
    }

    const success = await context.register(userName, password);

    if (success) {
      setRegistered(true);
    } else {
      setErrorMessage(
        "Sign up failed. Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
  };

  if (context.isAuthenticated === true) {
    return <Navigate to="/" />;
  }

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>Sign up</h2>

      <input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={signup}>Sign up</button>

      {errorMessage && <p>{errorMessage}</p>}

      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </>
  );
};

export default SignupPage;