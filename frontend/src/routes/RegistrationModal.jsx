import React, { useState } from "react";
import "../styles/RegistrationModal.css";

import Registration from "../components/Registration";

const RegistrationModal = ({ showRegistration, toggleModal }) => {
  return (
    <div className={`registration-modal ${showRegistration ? "active" : ""}`}>
      <div className="modal-content">
        <span className="form-close" onClick={toggleModal}>
          o
        </span>
        <Registration />
      </div>
    </div>
  );
};


export default RegistrationModal;
