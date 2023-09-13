import React from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import PokemonModal from "../routes/PokemonModal";
import PokemonListItem from "./PokemonListItem";
import PokemonLogo from "./PokemonLogo";

const PokemonList = () => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const onDisplayPokemonModal = (pokemon) => {
    dispatch({ type: "DISPLAY_POKEMON_DATA", payload: pokemon });
  };
  
  return (
    <div>
      {/* <PokemonLogo /> */}
      <div className="pokemon-container">
        {state.displayedPokemon.map((pokemon, index) => {
          // Check if the pokemon id from the display list is in the collection
          const foundPokemon = state.collectionPokemon.find(
            (item) => item.pokemon_id === pokemon.id
          );

          // Create a boolean variable to indicate whether it's in the collection
          const isInCollection = !!foundPokemon;

          // Define specific variables based on whether it's in the collection or not
          const templateVars = isInCollection
            ? {
                // Variables to pass if it's in the collection
                isShiny: foundPokemon.caught_shiny,
                collection_id: foundPokemon.id,
                isNormal: foundPokemon.caught_normal
              }
            : {
                // Variables to pass if it's not in the collection
                caught_normal: false,
                caught_shiny: false,
              };

          return (
            <PokemonListItem
              key={index}
              pokemon={pokemon}
              onDisplayPokemonModal={onDisplayPokemonModal}
              isInCollection={isInCollection}
              {...templateVars}
            />
          );
        })}
      </div>
      {state.isModalVisible && <PokemonModal />}
    </div>
  );
};

export default PokemonList;
