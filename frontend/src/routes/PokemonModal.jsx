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

  const [gender, setGender] = useState('');  


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
      return genusEntry.language.name === "en"
    })
    if(genusText) {
      return genusText.genus
      // need to only take the first name dont include "Pokemon"
    }
    return '';
  }

  const getPokemonGender = () => {
    let pokemonGenders = state.pokemonByGenders.filter((pokemonGender) => {
      return pokemonGender.name === state.selectPokemonData.name
    })

    setGender(pokemonGenders.map((pokemonGender) => pokemonGender.gender).join(', '))

  }


  useEffect(() => {
    fetchEvolutionData(state.selectPokemonData, setEvolutionDetails);

    fetchPokemonLocations(dispatch, state.selectPokemonData.id);
  
    fetchSpeciesData(state.selectPokemonData, setSpeciesDetails);

    fetchTypesData(state.selectPokemonData, setTypesDetails);

    getPokemonGender()

  }, []);
    
  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${state.selectPokemonData.id}.png`
  return (
    <div className= {`pokemon-modal ${state.selectPokemonData.types[0].type.name}`} >
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClosePokemonModal}>
          &times;
        </span>
        <div className= " modal-container "  >
          <div className="parent modal-star-ball" >
            <p className="child modal-star" >star</p>
            <p className="child modal-ball">poke</p>
          </div>         
          <p className="parent modal-number" >No. {state.selectPokemonData.id}</p>
          <img
            className="modal-picture"
            src={officialArtworkUrl}
            alt={state.selectPokemonData.name}
          />
          <div className="parent modal-stats" >
            <p className="child modal-gender" >Gender: {gender}</p>
            <p className="child modal-height" >Height: {state.selectPokemonData.height}</p>
            <p className="child modal-weight" >Weight: {state.selectPokemonData.weight}</p>
            <p className="child modal-category" >Category:  {speciesDetails?.genera?.length > 0 && getGenusText(speciesDetails.genera)} </p>
            <p className="child modal-ability" >Abilities: {state.selectPokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>
          <p className="parent modal-name" >{state.selectPokemonData.name}</p>

          <div className="parent modal-form" >Forms:
          
            <div className=" form-default" >
              <p className=" form-title" >Default</p>
              <img
                className={ `parent modal-form-picture ${state.selectPokemonData.types[0].type.name} `}
                src={state.selectPokemonData?.sprites?.front_default}
                alt={state.selectPokemonData.name}
              /> 
            </div>
            <div className="child form-shiny "> 
              <p className="form-title" >Shiny</p>
                <img
                  className={ `parent modal-form-picture ${state.selectPokemonData.types[0].type.name} `}
                  src={state.selectPokemonData?.sprites?.front_shiny}
                  alt={state.selectPokemonData.name}
                />   
            </div>          
          </div>   
          <p className="parent modal-description" >Description: {speciesDetails?.flavor_text_entries?.length > 0 && getFlavorText(speciesDetails.flavor_text_entries)}</p>
          <div className="parent modal-type-weak" >
            <p className="child modal-type" >Types: {state.selectPokemonData.types.map((type) => type.type.name).join(', ')}</p>
            <p className="child modal-weakness" >Weaknesses: {typesDetails?.damage_relations?.double_damage_from.map((weakness) => weakness.name).join(', ')}  </p>
          </div>
          <ul className="parent modal-location" >
          Locations:
          {state.locations.map((location, index) => (
            <li className="child" key={index}>
              {location.location_area.name}
              <ul className="child" >
                {location.version_details.map((version, vIndex) => (
                  <li key={vIndex}>{version.version.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
          <div className=" evol-child-yellow parent modal-evol-chain">
            <h4 className=" evol-child-blue " >Evolution Chain:</h4>
            {evolutionDetails[state.selectPokemonData.name] && (
              <div className="evol-child-red " >
                {PokemonEvolutions(evolutionDetails[state.selectPokemonData.name].chain)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
