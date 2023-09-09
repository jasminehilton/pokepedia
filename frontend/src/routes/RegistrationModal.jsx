import React, { useState } from "react";

import Registration from "../components/Registration";

const RegistrationModal = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const onDisplayRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <div>
      <Registration />
    </div>
  );
}

export default RegistrationModal;