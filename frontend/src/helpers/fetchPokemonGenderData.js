import { ACTIONS } from "../hooks/reducer";
import axios from "axios";

export const fetchPokemonGenderData = async (dispatch) => {
	let pokemonGenders = [];

	let pokemonGenderPromises = [];

  // create a list of promise all the three genders
	for (let i = 1; i <= 3; i++) {
		pokemonGenderPromises.push(
			axios.get(`https://pokeapi.co/api/v2/gender/${i}/`)
		);
	}

  // go over all the gender promises when they are all successful
	Promise.all(pokemonGenderPromises)
		.then((responses) => {
			responses.forEach((response) => {
				let gender = response.data.name;
				let test = response.data.pokemon_species_details.map(
					(pokemon_specie) => {
						return {
							gender: gender,
							name: pokemon_specie.pokemon_species.name,
						};
					}
				);
				pokemonGenders = [...pokemonGenders, ...test]
			});
		})
		.then(() => {
      // Action to save this data in state
      dispatch({
        type: ACTIONS.FETCH_POKEMON_GENDERS,
        payload: pokemonGenders 
      });
		});
};
