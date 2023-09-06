import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";

const PokemonList = () => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

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
          {/* <ul>
            {state.pokemonData.map((pokemon, index) => (
              <li key={index}>
                <ul>ID: {pokemon.id}</ul>
                <ul>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </ul>
                <ul>{pokemon.name}</ul>
                <hr />
              </li>
            ))} */}
          {/* </ul> */}
          {state.filters.types.length > 0 && 
            <ul>
            {state.filteredPokemonData.map((pokemon, index) => (
              <li key={index}>
                <ul>ID: {pokemon.id}</ul>
                <ul>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </ul>
                <ul>{pokemon.name}</ul>
                <hr />
              </li>
            ))}
          </ul>}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
