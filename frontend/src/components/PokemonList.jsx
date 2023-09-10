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
        {state.displayedPokemon.map((pokemon, index) => (
          <PokemonListItem
            key={index}
            pokemon={pokemon}
            onDisplayPokemonModal={onDisplayPokemonModal}
          />
        ))}
      </div>
      {state.isModalVisible && <PokemonModal />}
    </div>
  );
};

export default PokemonList;
