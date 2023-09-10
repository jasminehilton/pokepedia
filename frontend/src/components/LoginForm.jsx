import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";

const LoginForm = ({
  email,
  handleEmail,
  password,
  handlePassword,
  submitted,
  error,
  handleSubmit,
}) => {
  return (
    <section className="form-login">
      <div className="pokeball">
        <img
          src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png"
          width="200" height="200" alt="Pokeball" />
      </div>
      <div>
        <p className="form-title">Pokedex Login</p>
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
            <p>Login successful for user {email}!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <Form.Text>Invalid email or password. Please try again.</Form.Text>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          variant="danger"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </section>
  );
};

export default LoginForm;
