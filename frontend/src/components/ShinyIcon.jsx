import React from "react";
import "../styles/icons.css";
import uncaughtShiny from "../icons/uncaught-shiny.png"

const ShinyIcon = () => {
  return (
    <div>
      <img className="shiny-icon"
        src={uncaughtShiny}
        // SHINY ONE COMMENTED OUT
        // src={"https://img.icons8.com/bubbles/50/pixel-star.png"}
        alt="pixel-star" />
    </div>
  );
};

export default ShinyIcon;
