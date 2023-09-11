import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const signIn = (e) => {
    e.preventDefault(); //prevents page from refreshing
    signInWithEmailAndPassword(auth, email, password)
      .then(useCredential => {
        console.log(useCredential);
        setSubmitted(true);
        setError(false);
        closeModal();
      }).catch(error => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      submitted={submitted}
      error={error}
      setError={setError}
      signIn={signIn}
    />
  );
};

export default Login;
