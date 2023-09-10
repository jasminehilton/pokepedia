import React, { useState } from "react";
import "../styles/RegistrationModal.css";

import Registration from "../components/Registration";

const RegistrationModal = ({ showRegistration, toggleModal }) => {
  return (
    <div className={`registration-modal ${showRegistration ? "active" : ""}`}>
      <div >
        <span className="form-close" onClick={toggleModal}>
          O
        </span>

        <Registration className="modal-content"/>
      </div>
    </div>
  );
};


export default RegistrationModal;
