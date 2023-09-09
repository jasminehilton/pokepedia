import React, { useState } from "react";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setSubmitted(true);
    }
    else {
      setError(true);
    }
  }

  const successMessage = () => {
    return (
      <div
        className="success-message"
        style={{ display: submitted ? "block" : "none" }}
      >
        <h1>User {email} successfully registered!!</h1>
      </div>
    );
  }

  const errorMessage = () => {
    return (
      <div
        className="error-message"
        style={{ display: error ? "block" : "none" }}
      >
        <h1>Please enter a valid email and password</h1>
      </div>
    )
  }

  return (
    <section className="form-registration">
      <div>
        <h1>Pokedex Registration</h1>
      </div>
      <form>
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="text" value={email}
          onChange={handleEmail}
        />

        <label className="form-label">Password</label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        
        <button
          onClick={handleSubmit}
          className="form-button-submit"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Registration;