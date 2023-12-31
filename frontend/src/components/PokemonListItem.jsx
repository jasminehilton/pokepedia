import React from "react";
import "../styles/PokemonListItem.css";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import "../styles/PokemonTypes.css";
import ShinyButton from "./ShinyButton";
import NormalButton from "./NormalButton";
import { usePokemonDataContext } from "../providers/pokeProvider";

const PokemonListItem = ({
  pokemon,
  onDisplayPokemonModal,
  collection_id,
  isShiny,
  isNormal,
}) => {
  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const state = usePokemonDataContext();

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

          {state.isLoggedIn === true && (
            <div className="icon-container">
              <ShinyButton
                pokemon_id={pokemon.id}
                collection_id={collection_id}
                isShiny={isShiny}
              />
              <NormalButton
                pokemon_id={pokemon.id}
                collection_id={collection_id}
                isNormal={isNormal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;
