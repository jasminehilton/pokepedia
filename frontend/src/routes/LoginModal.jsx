import React from "react";
import "../styles/LoginModal.css";

import Login from "../components/authentication/Login";

const LoginModal = ({ showLogin, toggleModal }) => {

  return (
    <div className={`login-modal ${showLogin ? "active" : ""}`}>
      <div>
        <span className="form-close" onClick={toggleModal}>
          O
        </span>
        <Login
          className="modal-content"
          closeModal={toggleModal}
        />
      </div>
    </div>
  );
};

export default LoginModal;
