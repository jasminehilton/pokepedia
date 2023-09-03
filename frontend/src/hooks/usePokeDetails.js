import { useEffect, useState } from "react";
import P from "../helpers/pokeApiConfig";

const usePokeDetails = (pokemon_id) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonLocations, setPokemonLocations] = useState(null);
  const [ pokemonWeaknesses, setPokemonWeaknesses] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await P.getPokemonByName(pokemon_id);
        setPokemonDetails(response);
      } catch (error) {
        console.error("Error fetching pokemon details:", error);
      }
    };

    const fetchPokemonEncounters = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}/encounters`);
        const data = await response.json();
        setPokemonLocations(data);
      } catch (error) {
        console.error("Error fetching encounter details:", error);
      }
    };

    // const fetchPokemonWeaknesses = async () => {
    //   try {
    //     const response = await fetch(`https://pokeapi.co/api/v2/type/${}`);
    //     const data = await response.json();
    //     setPokemonLocations(data);
    //   } catch (error) {
    //     console.error("Error fetching encounter details:", error);
    //   }
    // };

    if (pokemon_id) {
      fetchPokemonDetails();
      fetchPokemonEncounters();
      // fetchPokemonWeaknesses();
    }
  }, [pokemon_id]);

  return {
    pokemonDetails,
    pokemonLocations,
    pokemonWeaknesses
  };
};

export default usePokeDetails;
