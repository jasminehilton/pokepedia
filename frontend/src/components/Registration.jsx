import React, { useState } from "react";

const Registration = () => {
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
    } else {
      setError(true);
    }
  };

  return (
    <section className="form-registration">
      <div>
        <h1>Pokedex Registration</h1>
      </div>
      <form>
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="text"
          value={email}
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

      {submitted && (
        <div className="success-message">
          <h1>User {email} successfully registered!!</h1>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h1>Please enter a valid email and password</h1>
        </div>
      )}
    </section>
  );
};

export default Registration;
