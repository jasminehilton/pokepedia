import React, { useEffect, useState } from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import fetchPokemonLocations from '../helpers/fetchPokemonLocations';
import { fetchEvolutionData } from '../helpers/fetchEvolutionData'; 
import PokemonEvolutions from '../components/PokemonEvolutions';
import "../styles/PokemonModal.css"
import { fetchSpeciesData } from "../helpers/fetchSpeciesData";

const PokemonModal = () => {
  const dispatch = usePokemonDataDispatchContext();
  const state = usePokemonDataContext();
  const onClosePokemonModal = () => {
    dispatch({ type: 'CLOSE_POKEMON_DATA' });
  }
  const [evolutionDetails, setEvolutionDetails] = useState({});

  const [speciesDetails, setSpeciesDetails] = useState({}) 

  fetchPokemonLocations(dispatch, state.selectPokemonData.id);
  
  fetchSpeciesData(state.selectPokemonData, setSpeciesDetails);

  const getFlavorText = (flavorEntries) => {
    let flavorText = flavorEntries.find((flavorEntry) => {
      return flavorEntry.language.name === "en"
    })

    if(flavorText) {
      return flavorText.flavor_text
    }
    
    return '';

  }

  useEffect(() => {
    // Fetch evolution data for each Pokémon in the list
    // state.pokemonData.forEach((pokemon) => {
      fetchEvolutionData(state.selectPokemonData, setEvolutionDetails);
    // });
  }, [state.selectPokemonData]);

  return (
    <div className="pokemon-modal">
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClosePokemonModal}>
          &times;
        </span>
        <div className=" modal-container" >
          <h1 className="child modal-name" >{state.selectPokemonData.name}</h1>
          <p className="child modal-number" >ID: {state.selectPokemonData.id}</p>
          <img
            className="child modal-picture"
            src={state.selectPokemonData.sprites.front_default}
            alt={state.selectPokemonData.name}
          />
        <div className="child modal-form-card " >
          <p className=" child form-button form-default " >Default</p>
          <p className="child form-button form-shiny " >Shiny</p>
          <p className="child modal-form" >Forms:
            <img
              className="child modal-picture"
              src={state.selectPokemonData.sprites.front_default}
              alt={state.selectPokemonData.name}
            /> 
            <img
              className="child modal-picture"
              src={state.selectPokemonData.sprites.front_shiny}
              alt={state.selectPokemonData.name}
            /> 
          </p>

        </div>
          <p className="child modal-description" >Description: {speciesDetails?.flavor_text_entries?.length > 0 && getFlavorText(speciesDetails.flavor_text_entries)} </p>

          <div className="child modal-stats" >
            <p className="child modal-gender" >Gender: </p>
            <p className="child modal-height" >Height: {state.selectPokemonData.height}</p>
            <p className="child modal-weight" >Weight: {state.selectPokemonData.weight}</p>
            <p className="child modal-category" >Category: </p>
            <p className="child modal-ability" >Abilities: {state.selectPokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>

          <div className="child modal-type-weak" >
            <p className="child modal-type" >Types: {state.selectPokemonData.types.map((type) => type.type.name).join(', ')}</p>
            <p className="child modal-weakness" >Weaknesses: </p>
          </div>

          <div className="child modal-star-ball" >
            <p className="child modal-star" >star</p>
            <p className="child modal-ball">pokeball</p>
          </div>

          <ul className="child modal-location" >
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
          <div className="child modal-evol-chain">
            <h4 >Evolution Chain:</h4>
            {evolutionDetails[state.selectPokemonData.name] && (
              <p>
                {PokemonEvolutions(evolutionDetails[state.selectPokemonData.name].chain)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
