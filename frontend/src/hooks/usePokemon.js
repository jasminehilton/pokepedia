// usePokemonApi.js
import { useEffect, useState } from "react";
import P from '../helpers/pokeApiConfig'

const usePokemonApi = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      try {
        const allPokemonData = [];
        const totalPokemonCount = 20; // Total number of Pokémon as of my knowledge cutoff date

        for (let id = 1; id <= totalPokemonCount; id++) {
          const response = await P.getPokemonByName(id);
          allPokemonData.push(response);
        }

        setPokemonData(allPokemonData);
        setLoading(false);
      } catch (error) {
        console.log('There was an ERROR: ', error);
        setLoading(false);
      }
    };

    fetchAllPokemonData();
  }, []);

  return { pokemonData, loading }
};

export default usePokemonApi;
