import React from "react";
import "../styles/PokemonListItem.css"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {

  return (
    <div className="pokemon-display">
      <div className="pokemon-list__item">
        <p className="pokemon-id">ID: {pokemon.id}</p>
        <div className="pokemon-list__image-name">
          <img
            className="pokemon-list__image"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            onClick={() => onDisplayPokemonModal(pokemon)}
          />
          <p className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;