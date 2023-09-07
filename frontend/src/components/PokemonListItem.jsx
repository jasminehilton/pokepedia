import React from "react";
import "../styles/PokemonListItem.css"

const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="pokemon-display">
      <div className="pokemon-list__item">
        <h5 className="pokemon-id">No.{pokemon.id}</h5>
        <div className="pokemon-tile">
          <img
            className="pokemon-list__image"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            onClick={() => onDisplayPokemonModal(pokemon)}
          />
        </div>
        <h3 className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</h3>
      </div>
    </div>
  );
};

export default PokemonListItem;