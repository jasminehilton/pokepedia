import React from "react";
import "../styles/PokemonListItem.css"

const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {

  return (
    <div className="pokemon-display">
      <div className="pokemon-list__item">
        <h5>ID: {pokemon.id}</h5>
        <div className="pokemon-list__image-name">
          <img
            className="pokemon-list__image"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            onClick={() => onDisplayPokemonModal(pokemon)}
          />
          <h3>{pokemon.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;