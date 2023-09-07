import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import PokemonModal from "../routes/PokemonModal";
import PokemonListItem from "./PokemonListItem";
import Pagination from "./Pagination";
import getDisplayedPokemon from "../helpers/getDisplayedPokemon";
import handlePageChange from "../helpers/handlePageChange";
import PokemonLogo from "./PokemonLogo"

const PokemonList = ({ isOpen, onClose }) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const onDisplayPokemonModal = (pokemon) => {
    dispatch({ type: 'DISPLAY_POKEMON_DATA', payload: pokemon });
  };

  useEffect(() => {
    fetchPokemonData(dispatch);
  }, []);

  // getDisplayedPokemon(state.pokemonData, state.filteredPokemonData, state.currentPage, state.itemsPerPage, dispatch);
  useEffect(() => {
    getDisplayedPokemon(state.pokemonData, state.filteredPokemonData, state.currentPage, state.itemsPerPage, dispatch);
  }, [state.filteredPokemonData, state.pokemonData])


  return (
    <div>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <div>
          <Pagination next={() => handlePageChange(dispatch, state.currentPage + 1, state.itemsPerPage, state.pokemonData.length)} prev={() => handlePageChange(dispatch, state.currentPage - 1, state.itemsPerPage, state.pokemonData.length)} />
          <PokemonLogo />
          <div className="pokemon-container">
            {state.displayedPokemon.map((pokemon, index) => (
              <PokemonListItem
                key={index}
                pokemon={pokemon}
                onDisplayPokemonModal={onDisplayPokemonModal}
              />
            ))}
          </div>
        </div>
      )}
      {state.isModalVisible && (
        <PokemonModal />
      )}
    </div>
  );
};

export default PokemonList;
