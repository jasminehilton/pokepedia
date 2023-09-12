import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/Login.css";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  submitted,
  error,
  setError,
  signIn,
}) => {
  return (
    <section className="form-login">
      <div className="pokeball">
        <img
          src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png"
          width="200" height="200" alt="Pokeball" />
      </div>
      <div>
        <p className="form-title">Welcome Back</p>
      </div>
      <Form className="form-container" onSubmit={signIn}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setError(false);
              setEmail(e.target.value)
            }}
            className="input-font"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value)
            }}
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
          onClick={signIn}
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
