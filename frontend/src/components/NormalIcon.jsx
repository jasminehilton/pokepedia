import React from "react";
import uncollectedPokeball from "../icons/uncollectedPokeball.png";
import collectedPokeball from "../icons/collectedPokeball.png";
import '../styles/icons.css'

const NormalIcon = () => {
  return (
    <div>
      <img
        className="normal-icon"
        src={uncollectedPokeball}
        alt="uncollected-pokeball"
      />
    </div>
  );
}

export default NormalIcon;