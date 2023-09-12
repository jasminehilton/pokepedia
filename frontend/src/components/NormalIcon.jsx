import React from "react";
import uncollectedPokeball from "../icons/uncollectedPokeball.png";
import collectedPokeball from "../icons/collectedPokeball.png";
import "../styles/icons.css";

const NormalIcon = (props) => {
  return (
    <div>
      <img
        className="normal-icon"
        src={props.isNormal ? collectedPokeball : uncollectedPokeball}
        alt="uncollected-pokeball"
        onClick={props.onClick}
      />
    </div>
  );
};

export default NormalIcon;
