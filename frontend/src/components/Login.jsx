import React, { useState } from "react";
import LoginForm from "./LoginForm";

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setError(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this logic with your authentication logic
    if (email === "user@example.com" && password === "password") {
      setSubmitted(true);
      setError(false);
      closeModal();
    } else {
      setError(true);
    }
  };

  return (
    <LoginForm
      email={email}
      handleEmail={handleEmail}
      password={password}
      handlePassword={handlePassword}
      submitted={submitted}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
