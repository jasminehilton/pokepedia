import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchPokemonData from "../helpers/fetchPokemonData";
import FilterDropdown from "./FilterDropdown";
import Pagination from "./Pagination";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import PokemonModal from "../routes/PokemonModal";

const PokemonList = ({ isOpen, onClose }) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const [selectedType, setSelectedType] = useState(null);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [showInitialPokemon, setShowInitialPokemon] = useState(true);

  const onDisplayPokemonModal = (pokemon) => {
    dispatch({ type: 'DISPLAY_POKEMON_DATA', payload: pokemon });
  };

  useEffect(() => {
    fetchPokemonData(dispatch);
  }, []);

  useEffect(() => {
    if (selectedType === "") {
      // When "All Types" is selected, reset to initial 20 Pokémon
      setShowInitialPokemon(true);
      setFilteredPokemonData([]);
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((response) => {
          const pokemonUrls = response.data.pokemon.map((entry) => entry.pokemon.url);
          return Promise.all(pokemonUrls.map((url) => axios.get(url)));
        })
        .then((responses) => {
          const pokemonDetails = responses.map((response) => response.data);
          setFilteredPokemonData(pokemonDetails);
          setShowInitialPokemon(false);
        })
        .catch((error) => {
          console.error('Error fetching Pokémon data:', error);
        });
    }
  }, [selectedType]);

  const initialPokemonToDisplay = showInitialPokemon ? state.pokemonData : [];
  const filteredPokemonToDisplay = showInitialPokemon ? [] : filteredPokemonData;

  const loadNextPage = () => {
    if (state.next) {
      const url = state.next;
      fetchPokemonData(dispatch, url);
    }
  };

  const loadPreviousPage = () => {
    if (state.previous) {
      const url = state.previous;
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
          <FilterDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            typesData={state.typesdata}
          />
          {filteredPokemonData.map((pokemon, index) => (
            <div key={index}>
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
            </div>
          ))}
          <Pagination
            loadPreviousPage={loadPreviousPage}
            loadNextPage={loadNextPage}
          />
        </div>
      )}
      {state.isModalVisible && <PokemonModal />}
      {[...initialPokemonToDisplay, ...filteredPokemonToDisplay].map((pokemon, index) => (
        <div key={index}>
          {/* Render Pokémon details here */}
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
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
