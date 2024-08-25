import React, { useEffect, useState } from "react";
import { useUserLoginMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, loginResponse] = useUserLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pop, setPop] = useState(true);

  const submit = () => {
    loginData({ email, password });
  };

  console.log(loginResponse, "RRRRR");

  const homeHandler = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (loginResponse?.status === "fulfilled" && loginResponse.data) {
      localStorage.setItem("jwt", loginResponse.data.token);
      localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
    }
    const detail = localStorage.getItem("jwt");
    if (detail) {
      navigate("/", { replace: true });
    }
  }, [loginResponse]);

  return (
    <div className="signup-container">
      <div onClick={() => navigate("/")}></div>
      <Hero />
      <div className="signup-card z-30">
        <h2>Login</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          type="password"
          placeholder="Password"
        />
        <button onClick={submit} className="signup-button">
          Login
        </button>
        <div className="existing-account">
          <p>Don't have an account?</p>
          <button onClick={() => navigate("/signup")} className="login-button">
            Create Account
          </button>
        </div>
        {loginResponse?.status === "rejected" && (
          <div className="signup-message error">
            {loginResponse.error?.data?.msg || "An error occurred."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
