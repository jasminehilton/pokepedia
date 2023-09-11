import capitalizeFirstLetter from "./capitalizeFirstLetter";
export const fetchEvolutionData = async (pokemonData, setEvolutionDetails) => {
  try {
    const speciesResponse = await fetch(pokemonData.species.url);
    if (!speciesResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const speciesData = await speciesResponse.json();

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    if (!evolutionResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const evolutionData = await evolutionResponse.json();

    setEvolutionDetails((prevEvolutionDetails) => ({
      ...prevEvolutionDetails,
      [pokemonData.name]: evolutionData,
    }));
  } catch (error) {
    console.error('Error:', error);
  }
};
