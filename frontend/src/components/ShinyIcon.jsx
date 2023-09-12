import React from "react";
import "../styles/icons.css";
import uncaughtShiny from "../icons/uncaught-shiny.png";

const ShinyIcon = (props) => {
  return (
    <div>
      <img
        className="shiny-icon"
        src={
          props.isShiny
            ? "https://img.icons8.com/bubbles/50/pixel-star.png"
            : uncaughtShiny
        }
        alt="pixel-star"
        onClick={props.onClick}
      />
    </div>
  );
};

export default ShinyIcon;
