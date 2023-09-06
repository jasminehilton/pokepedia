import React, { useEffect, useState } from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import fetchPokemonLocations from '../helpers/fetchPokemonLocations';
import { fetchEvolutionData } from '../helpers/fetchEvolutionData'; 
import PokemonEvolutions from '../components/PokemonEvolutions';
import "../styles/PokemonModal.css"

const PokemonModal = () => {
  const dispatch = usePokemonDataDispatchContext();
  const state = usePokemonDataContext();
  const onClosePokemonModal = () => {
    dispatch({ type: 'CLOSE_POKEMON_DATA' });
  }
  const [evolutionDetails, setEvolutionDetails] = useState({});

  fetchPokemonLocations(dispatch, state.selectPokemonData.id);

  useEffect(() => {
    // Fetch evolution data for each Pokémon in the list
    state.pokemonData.forEach((pokemon) => {
      fetchEvolutionData(pokemon, setEvolutionDetails);
    });
  }, [state.pokemonData]);

  return (
    <div className="pokemon-modal">
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClosePokemonModal}>
          &times;
        </span>
        <h1>{state.selectPokemonData.name}</h1>
        <p>ID: {state.selectPokemonData.id}</p>
        <img
          src={state.selectPokemonData.sprites.front_default}
          alt={state.selectPokemonData.name}
        />
        <p>Height: {state.selectPokemonData.height}</p>
        <p>Weight: {state.selectPokemonData.weight}</p>
        <p>Types: {state.selectPokemonData.types.map((type) => type.type.name).join(', ')}</p>
        <p>Abilities: {state.selectPokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>

        <ul>
          Locations:
          {state.locations.map((location, index) => (
            <li key={index}>
              {location.location_area.name}
              <ul>
                {location.version_details.map((version, vIndex) => (
                  <li key={vIndex}>{version.version.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <h4>Evolution Chain:</h4>
        {evolutionDetails[state.selectPokemonData.name] && (
          <p>
            {PokemonEvolutions(evolutionDetails[state.selectPokemonData.name].chain)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PokemonModal;
