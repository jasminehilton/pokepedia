import React, { useState } from "react";
import "../styles/Registration.css";
import RegistrationForm from "./RegistrationForm";

const Registration = ({ closeModal }) => {
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
    if (email && password) {
      setSubmitted(true);
      setError(false);
      closeModal();
    } else {
      setError(true);
    }
  };

  return (
    <RegistrationForm
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

export default Registration;
