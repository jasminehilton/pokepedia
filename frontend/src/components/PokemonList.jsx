import React, { useState, useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import PokemonModal from "../routes/PokemonModal";
import axios from "axios";

const PokemonList = ({ isOpen, onClose }) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const [selectedType, setSelectedType] = useState(null);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);

  const handleTypeChange = (e) => {
    const newSelectedType = e.target.value;
    setSelectedType(newSelectedType);

    if (newSelectedType === "") {
      // If "All Types" is selected, show all Pokémon
      setFilteredPokemonData(state.pokemonData);
    } else {
      // Filter Pokémon by the selected type
      const filtered = state.pokemonData.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === newSelectedType)
      );
      setFilteredPokemonData(filtered);
    }
  };

  useEffect(() => {
    if (selectedType === "") {
      // If no type is selected, show all Pokémon
      setFilteredPokemonData(state.pokemonData);
    } else {
      // Fetch Pokémon data based on the selected type
      axios
        .get(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((response) => {
          const pokemonUrls = response.data.pokemon.map((entry) => entry.pokemon.url);
          return Promise.all(pokemonUrls.map((url) => axios.get(url)));
        })
        .then((responses) => {
          const pokemonDetails = responses.map((response) => response.data);
          setFilteredPokemonData(pokemonDetails);
        })
        .catch((error) => {
          console.error('Error fetching Pokémon data:', error);
        });
    }
  }, [selectedType, state.pokemonData]);

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

          {/* Display the dropdown with all types */}
          <label>Filter by Type:</label>
          <select onChange={handleTypeChange} value={selectedType}>
            <option value="">All Types</option>
            {state.typesdata.results.map((type) => ( // Use state.typesdata.results
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          {/* Render the filtered Pokémon here */}
          {filteredPokemonData.map((pokemon, index) => (
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
        <PokemonModal />
      )}
    </div>
  );
};

export default PokemonList;
