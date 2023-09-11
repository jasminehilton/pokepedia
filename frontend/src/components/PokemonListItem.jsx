import React from "react";
import "../styles/PokemonListItem.css"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import "../styles/PokemonTypes.css"
import NormalIcon from "../components/NormalIcon"

const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {
  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="pokemon-display">
      <div className="pokemon-list__item">
        <p className="pokemon-id">No.{pokemon.id}</p>
        <div className="pokemon-list__image-name">
          <img
            className={`pokemon-list__image ${pokemon.types[0].type.name}`}
            src={officialArtworkUrl}
            alt={pokemon.name}
            onClick={() => onDisplayPokemonModal(pokemon)}
          />
            <p className={`pokemon-name`}>{capitalizeFirstLetter(pokemon.name)}</p>
            <NormalIcon />
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;