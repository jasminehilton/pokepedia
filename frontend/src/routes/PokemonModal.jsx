import React from "react";
import { usePokemonDataDispatchContext } from "../providers/pokeProvider";

const PokemonModal = ({ pokemon }) => {
  const dispatch = usePokemonDataDispatchContext();
  const onClosePokemonModal = () => {
    dispatch({ type: 'CLOSE_POKEMON_DATA' });
  }

  return (
    <div className="pokemon-modal">
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClosePokemonModal}>
          &times;
        </span>
        <span>HELLO</span>
        {/* <h2>{pokemon.name}</h2>
        <p>ID: {pokemon.id}</p>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name} /> */}
      </div>
    </div>
  );
};

export default PokemonModal;
