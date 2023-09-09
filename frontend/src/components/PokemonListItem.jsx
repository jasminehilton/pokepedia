import React from "react";
import "../styles/PokemonListItem.css"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import "../styles/PokemonTypes.css"


const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {
  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  console.log('HI:', pokemon.types[0].type.name);
  
  return (
    <div className="pokemon-display">
      <div className="pokemon-list__item">
        <p className="pokemon-id">No.{pokemon.id}</p>
        <div className="pokemon-list__image-name">
          <img
            className="pokemon-list__image"
            src={officialArtworkUrl}
            alt={pokemon.name}
            onClick={() => onDisplayPokemonModal(pokemon)}
          />
          <p className={`pokemon-name ${pokemon.types[0].type.name}`}>{capitalizeFirstLetter(pokemon.name)}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;