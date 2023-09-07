import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import axios from "axios";
import RegionListItem from "./RegionListItem";
import "../styles/RegionList.css"
import "../styles/RegionButton.css"


const P = new Pokedex();

function RegionList() {

	const [regions, setRegions] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState({});
	const [pokemonByRegion, setPokemonByRegion] = useState([]);

	// gets the list of regions 
	const getRegions = () => {
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
		let allPokemons = [];
		axios.get(selectedRegion.url)
			.then((response) => {
				console.log('response ', response.data)
				let pokedexes = response.data.pokedexes;
				// iterates through the list of pokedexes in the region object
				for (let pokedex of pokedexes) {
					axios.get(pokedex.url)
						.then((pokedexResponse) => {
							let pokemons = pokedexResponse.data.pokemon_entries.map((pokemonEntry) => {
								return pokemonEntry.pokemon_species;
							})
							setPokemonByRegion(allPokemons.concat(pokemons));
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
		if (selectedRegion) {
			getPokemonsByRegion()
		}
	}, [selectedRegion])

	return (
		<div className="regionList">
			<button className="regionsButton">Regions</button>
			{regions.map((region, index) => (
				<React.Fragment key={index}>
					<button className="region-button" onClick={() => setSelectedRegion(region)}>
						{region.name.charAt(0).toUpperCase() + region.name.slice(1)}
					</button>
					{selectedRegion === region && (
						<RegionListItem pokemonByRegion={pokemonByRegion} />
					)}
				</React.Fragment>
			))}
		</div>
	);
}

export default RegionList;