import { useContext, useState } from "react";
import { Navigate, Link } from "react-router";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    const success = await context.authenticate(userName, password);

    if (!success) {
      setErrorMessage("Login failed. Check your username and password.");
    }
  };

  if (context.isAuthenticated === true) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h2>Login</h2>

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

      <button onClick={login}>Log in</button>

      {errorMessage && <p>{errorMessage}</p>}

      <p>
        Not registered? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
};

export default LoginPage;