import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import axios from "axios";
import RegionListItem from "./RegionListItem";

const P = new Pokedex();

function RegionList() {

	const [regions, setRegions] = useState([]);

  const [selectedRegion , setSelectedRegion] = useState({})

  const [pokemonByRegion, setPokemonByRegion] = useState([])

  const [showRegions, setShowRegions] = useState(false);
  const toggleRegions = () => {
    setShowRegions((prevState) => !prevState);
  };

  // gets the list of regions 
	const getRegions = () => {
    // used a function from the promise api
		P.getRegionsList() 
			.then((response) => {
				console.log(response.results);
				setRegions(response.results);
			})
			.catch((error) => {
				console.log("There was an ERROR: ", error);
			});
	};

  // gets the pokemon associated with the selected region
  const getPokemonsByRegion = () => { 
    let allPokemons = []
    axios.get(selectedRegion.url)
    .then((response) => {
      console.log('response ', response.data)
      let pokedexes = response.data.pokedexes
      // iterates through the list of pokedexes in the region object
      for(let pokedex of pokedexes) {
        axios.get(pokedex.url)
        .then((pokedexResponse) => {
          let pokemons = pokedexResponse.data.pokemon_entries.map((pokemonEntry) => {
            return pokemonEntry.pokemon_species
          })
          setPokemonByRegion(allPokemons.concat(pokemons))
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
    if(selectedRegion) {
      getPokemonsByRegion()
    }
  }, [selectedRegion])

	return (

<div className="App">
      1. Region List
      <button onClick={toggleRegions}>Regions</button>
      {/* <div>2. Selected region is - {selectedRegion?.name}</div> */}

      {showRegions && (
        <div>
          {/* 3. Selected Region - {regions.length} */}
          {regions.map((region, index) => (
            <div key={index}>
              <button onClick={() => setSelectedRegion(region)}>
                {region.name}
              </button>
              {selectedRegion === region && (
                <RegionListItem pokemonByRegion={pokemonByRegion} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
	);
}

export default RegionList;