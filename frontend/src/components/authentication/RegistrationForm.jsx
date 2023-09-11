import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RegistrationForm = (
  { email, setEmail, password, setPassword,
    submitted, error, setError, signUp }) => {

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
      <Form className="form-container" onSubmit={signUp}>
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
            <p>User {email} successfully registered!!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <Form.Text>Please enter a valid email and password</Form.Text>
          </div>
        )}

        <Button
          onClick={signUp}
          variant="danger"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </section >
  )
};

export default RegistrationForm;