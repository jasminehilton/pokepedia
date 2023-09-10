import React, { useState } from "react";
import "../styles/Registration.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Registration = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false); // Clear the submitted state
    setError(false);    // Clear the error state
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false); // Clear the submitted state
    setError(false);    // Clear the error state
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
    <section className="form-registration">
      <div className="pokeball">
        <img
          src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png"
          width="200" height="200" alt="Pokeball" />
      </div>
      <div>
        <p className="form-title">Pokedex Registration</p>
      </div>
      <Form className="form-container">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={handleEmail}
            className="input-font"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="input-font"
          />
        </Form.Group>
        {submitted && (
          <div className="success-message">
            <p>User {email} successfully registered!!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <Form.Text>Please enter a valid email and password</Form.Text>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          variant="danger"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </section >
  );
};

export default Registration;
