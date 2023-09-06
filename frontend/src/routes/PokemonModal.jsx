import React, { useEffect } from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import fetchPokemonLocations from '../helpers/fetchPokemonLocations';
import fetchTypeInteractions from '../helpers/fetchTypeInteractions';

const PokemonModal = () => {
  const dispatch = usePokemonDataDispatchContext();
  const state = usePokemonDataContext();
  const onClosePokemonModal = () => {
    dispatch({ type: 'CLOSE_POKEMON_DATA' });
  }

  useEffect(() => {
    fetchPokemonLocations(dispatch, state.selectPokemonData.id);
    console.log("selectedPokemon", state.selectedPokemonData);
    fetchTypeInteractions(dispatch, 'grass');
  }, [state.selectPokemonData])

  return (
    <div className="pokemon-modal">
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClosePokemonModal}>
          &times;
        </span>
        <h2>{state.selectPokemonData.name}</h2>
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

        {/* <ul>
          Weaknesses:
          {state.TypeInteractions.takeTwoTimesDamage.map((weakness, index) => (
            <li key={index}>
              {weakness}
            </li>
          ))}
        </ul>  */}
      </div>
    </div>
  );


};

export default PokemonModal;
