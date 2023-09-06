import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import axios from "axios";
import RegionListItem from "./RegionListItem";

import { ACTIONS     } from "../hooks/reducer";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";

const P = new Pokedex();
 
function RegionList() {
	// const [regions, setRegions] = useState([]);

  // const [selectedRegion , setSelectedRegion] = useState({})

  const [pokemonByRegion, setPokemonByRegion] = useState([])

  const [showRegions, setShowRegions] = useState(false); //possibly change with pokemonList?
  const toggleRegions = () => {
    setShowRegions((prevState) => !prevState);
  };
  
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

  // gets the list of regions 
	const getRegions = () => {
    // used a function from the promise api
		P.getRegionsList() 
			.then((response) => {
				console.log(response.results);
        dispatch({ type: ACTIONS.SET_REGION, regionsData: response.results });
			})
			.catch((error) => {
				console.log("There was an ERROR: ", error);
			});
	};

  // gets the pokemon associated with the selected region
  const getPokemonsByRegion = () => { 
    let allPokemons = []
    console.log("state.filtes.regions.url", state.filters.regions.url)
    axios.get(state.filters.regions.url)
    .then((response) => {
      let pokedexes = response.data.pokedexes
      // iterates through the list of pokedexes in the region object
      for(let pokedex of pokedexes) {
        axios.get(pokedex.url)
        .then((pokedexResponse) => {
          let pokemons = pokedexResponse.data.pokemon_entries.map((pokemonEntry) => {
            return pokemonEntry.pokemon_species
          })
          setPokemonByRegion(allPokemons.concat(pokemons)) //set to main list of pokemons to show
        })
      }
    }).catch((error) => {
      console.log('error ', error)
    })
  }

	// on page load get all the regions
	useEffect(() => {
		console.log("load the pokemon regions now");
		getRegions();
	}, []);

  useEffect(() => {
    if(state.filters.regions) {
      getPokemonsByRegion()
    }
  }, [state.filters.regions])

	return (

<div className="App">
      
      <button onClick={toggleRegions}>Regions</button>

      <button onClick={() => {console.log("Clear Regions button clicked"); dispatch({ type: ACTIONS.CLEAR_REGION_FILTER }); setPokemonByRegion([]); }}>Clear Pokemon By Regions</button>

      {showRegions && (
        <div>
          {state.regionsData.map((regions, index) => (
            <div key={index}>
              <button onClick={() => dispatch({ type: ACTIONS.SET_SELECTED_REGION, selectedRegion: regions })}>
                {regions.name}
              </button>
         
            </div>
          ))}
        </div>
      )}
           {pokemonByRegion.length > 0 && (
                <RegionListItem pokemonByRegion={pokemonByRegion} />
              )}
    </div>
	);
}

export default RegionList;