import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import PokemonModal from "./PokemonModal";
import usePokemonData from "../hooks/reducer";

const PokemonList = ({ isOpen, onClose }) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const { onDisplayPokemonModal, onClosePokemonModal } = usePokemonData();

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
          <button onClick={loadPreviousPage}>Previous</button>
          <button onClick={loadNextPage}>Next</button>
          <ul>
            {state.pokemonData.map((pokemon, index) => (
              <ul key={index}>
                <h5>ID: {pokemon.id}</h5>
                <ul>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    style={{ width: "100px", height: "100px" }}
                    onClick={() => onDisplayPokemonModal(pokemon)}
                  />
                </ul>
                <h2>{pokemon.name}</h2>
              </ul>
            ))}
          </ul>
        </div>
      )}
      {state.isModalVisible && (
        <PokemonModal
          pokemon={state.selectPokemonData}
          onClose={onClosePokemonModal}
        />
      )}
    </div>
  );
};

export default PokemonList;
