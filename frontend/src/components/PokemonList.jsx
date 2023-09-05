import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import usePokemonData from "../hooks/reducer";

const PokemonList = () => {
  const { state, dispatch } = usePokemonData();

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
                    style={{ width: '100px', height: '100px' }}
                  />
                </ul>
                <h2>{pokemon.name}</h2>
              </ul>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default PokemonList;