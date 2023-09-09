import React, { useState } from "react";
import "../styles/Registration.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Registration = () => {
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
    } else {
      setError(true);
    }
  };

  return (
    <section className="form-registration">
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
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
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
    </section>
  );
};

export default Registration;
