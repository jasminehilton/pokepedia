import React from "react";
import "../styles/PokemonListItem.css"

const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {

  return (
    <div className="pokemon-list__item">
      <h5>ID: {pokemon.id}</h5>
      <div>
        <img
          className="pokemon-list__image"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          onClick={() => onDisplayPokemonModal(pokemon)}
        />
      </div>
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonListItem;