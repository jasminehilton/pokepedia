import React from 'react';
import { usePokemonDataContext } from "../providers/pokeProvider";
import "../styles/TypeButtons.css";

const TypeButton = ({ typeName, onTypeSelect }) => {
  const state = usePokemonDataContext(); // imports the state
  const capitalizedTypeName = typeName.toUpperCase();
  const buttonClassName = state.filters.types.includes(typeName) ? `type-button ${typeName} selected` : `type-button ${typeName}`;

  return (
    <button className={buttonClassName} onClick={onTypeSelect}>
      {capitalizedTypeName}
    </button>
  );
};

export default TypeButton;