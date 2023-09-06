import React from 'react';
import { usePokemonDataContext } from "../providers/pokeProvider";

const TypeButton = ({ typeName, onTypeSelect }) => {

  const state = usePokemonDataContext(); //imports the state
  
  const buttonClassName = state.filters.types.includes(typeName) ? 'type-button selected' : 'type-button';

  return (
    <button className={buttonClassName} onClick={ onTypeSelect }>
      {typeName}
    </button>
  );
};

export default TypeButton;