import React from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";

const PokemonModal = () => {
  const dispatch = usePokemonDataDispatchContext();
  const state = usePokemonDataContext();
  const onClosePokemonModal = () => {
    dispatch({ type: 'CLOSE_POKEMON_DATA' });
  }

  return (
    <div className="pokemon-modal">
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClosePokemonModal}>
          &times;
        </span>
        <h2>{state.selectPokemonData.name}</h2>
        <p>ID: {state.selectPokemonData.id}</p>
        <img
          src={state.selectPokemonData.sprites.front_default}
          alt={state.selectPokemonData.name} />
      </div>
    </div>
  );
};

export default PokemonModal;
