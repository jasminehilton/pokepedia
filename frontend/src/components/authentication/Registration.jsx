import React, { useState } from "react";
import '../../styles/Registration.css';
import RegistrationForm from "./RegistrationForm";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Registration = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const signUp = (e) => {
    e.preventDefault(); //prevents page from refreshing
    createUserWithEmailAndPassword(auth, email, password)
      .then(useCredential => {
        console.log(useCredential);
        setSubmitted(true);
        setError(false);
      }).catch(error => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <RegistrationForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      submitted={submitted}
      error={error}
      signUp={signUp}
    />
  );
};

export default Registration;
