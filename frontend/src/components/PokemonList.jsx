import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import PokemonModal from "../routes/PokemonModal";
import PokemonListItem from "./PokemonListItem";
import Pagination from "./Pagination";

const PokemonList = ({ isOpen, onClose }) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const onDisplayPokemonModal = (pokemon) => {
    dispatch({ type: 'DISPLAY_POKEMON_DATA', payload: pokemon });
  };

  useEffect(() => {
    fetchPokemonData(dispatch);
  }, []);

  const loadNextPage = () => {
    if (state.next) {
      const url = state.next; // Use the "next" URL provided in the state
      fetchPokemonData(dispatch, url);
    }
  };

  const loadPreviousPage = () => {
    if (state.previous) {
      const url = state.previous; // Use the "previous" URL provided in the state
      fetchPokemonData(dispatch, url);
    }
  };

  return (
    <div>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <div>
          <Pagination next={loadNextPage} prev={loadPreviousPage} />
          <div className="pokemon-container">
            {state.pokemonData.map((pokemon, index) => (
              <PokemonListItem
                key={index}
                pokemon={pokemon}
                onDisplayPokemonModal={onDisplayPokemonModal}
              />
            ))}
          </div>
          {state.filters.types.length > 0 &&
            <div>
              {state.filteredPokemonData.map((pokemon, index) => (
                <PokemonListItem
                  key={index}
                  pokemon={pokemon}
                  onDisplayPokemonModal={onDisplayPokemonModal}
                />
              ))}
            </div>}
        </div>
      )}
      {state.isModalVisible && (
        <PokemonModal />
      )}
    </div>
  );
};

export default PokemonList;
