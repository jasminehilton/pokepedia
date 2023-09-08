import React, { useEffect, useState } from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import fetchPokemonLocations from '../helpers/fetchPokemonLocations';
import { fetchEvolutionData } from '../helpers/fetchEvolutionData'; 
import PokemonEvolutions from '../components/PokemonEvolutions';
import "../styles/PokemonModal.css"
import { fetchSpeciesData } from "../helpers/fetchSpeciesData";
import { fetchTypesData } from "../helpers/fetchTypesData";


const PokemonModal = () => {
  const dispatch = usePokemonDataDispatchContext();
  const state = usePokemonDataContext();
  const onClosePokemonModal = () => {
    dispatch({ type: 'CLOSE_POKEMON_DATA' });
  }
  const [evolutionDetails, setEvolutionDetails] = useState({});

  const [speciesDetails, setSpeciesDetails] = useState({}) 

  const [typesDetails, setTypesDetails] = useState({})

  // fetchPokemonLocations(dispatch, state.selectPokemonData.id);
  
  // fetchSpeciesData(state.selectPokemonData, setSpeciesDetails);

  // fetchTypesData(state.selectPokemonData, setTypesDetails);
 

  const getFlavorText = (flavorEntries) => {
    let flavorText = flavorEntries.find((flavorEntry) => {
      return flavorEntry.language.name === "en"
    })
    if(flavorText) {
      return flavorText.flavor_text
    }
    return '';
  }

  const getGenusText = (genusEntries) => {
    let genusText = genusEntries.find((genusEntry) => {
      // console.log(genusText)
      return genusEntry.language.name === "en"
    })
    if(genusText) {
      return genusText.genus
      // need to only take the first name dont include "Pokemon"
    }
    return '';
  }



    // NOTE: this is getting pokemon evolution data for all the pokemons we have and not just the pokemon that is selected and viewed in the modal
    // i think it is fine to get one by one because right now it is getting it for all 1000 pokemons and their many evolutions, which can be more than like 10k calls
    // probably better to have this data only live in this component instead of state, because it doesn't need to be shared across the app
    
  useEffect(() => {
    // Fetch evolution data for each Pokémon in the list
    // state.pokemonData.forEach((pokemon) => {
    fetchEvolutionData(state.selectPokemonData, setEvolutionDetails);
    // });

    fetchPokemonLocations(dispatch, state.selectPokemonData.id);
  
    fetchSpeciesData(state.selectPokemonData, setSpeciesDetails);

    fetchTypesData(state.selectPokemonData, setTypesDetails);
  }, []);
    
  // useEffect(() => {
  //    // Fetch evolution data for each Pokémon in the list
  //   state.pokemonData.forEach((pokemon) => {
  //     fetchEvolutionData(pokemon, setEvolutionDetails);
  //   });
  // }, [state.selectPokemonData]);
  
  // So everytime the pokemon data is updated which is everytime we get the evolution data, this entire modal get rendered again - so it's in a constant 
  // state of fetching data. 
  // Probably better to just do one call by fetching evolution data for only the selected pokemon and not store in the state but in the PokemonModal component with 
  // a simple useState




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
              className="child modal-form-picture"
              src={state.selectPokemonData.sprites.front_default}
              alt={state.selectPokemonData.name}
            /> 
            <img
              className="child modal-form-picture"
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
            <p className="child modal-category" >Category:  {speciesDetails?.genera?.length > 0 && getGenusText(speciesDetails.genera)} </p>
            <p className="child modal-ability" >Abilities: {state.selectPokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>

          <div className="child modal-type-weak" >
            <p className="child modal-type" >Types: {state.selectPokemonData.types.map((type) => type.type.name).join(', ')}</p>
            <p className="child modal-weakness" >Weaknesses: {typesDetails?.damage_relations?.double_damage_from.map((weakness) => weakness.name).join(', ')}  </p>
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
