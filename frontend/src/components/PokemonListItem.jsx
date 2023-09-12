import React from "react";
import "../styles/PokemonListItem.css";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import "../styles/PokemonTypes.css";
import ShinyButton from "./ShinyButton";
import ShinyIcon from "./ShinyIcon";
import NormalIcon from "./NormalIcon";

const PokemonListItem = ({
  pokemon,
  onDisplayPokemonModal,
  collection_id,
  isShiny,
}) => {
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
          <p className={`pokemon-name`}>
            {capitalizeFirstLetter(pokemon.name)}
          </p>
          <div className="icon-container">
            <ShinyButton
              pokemon_id={pokemon.id}
              collection_id={collection_id}
              isShiny={isShiny}
            />
            <NormalIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;
