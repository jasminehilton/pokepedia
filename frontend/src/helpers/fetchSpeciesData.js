export const fetchSpeciesData = async (pokemonData, setSpeciesDetails) => {
  try {
    const speciesResponse = await fetch(pokemonData.species.url);
    if (!speciesResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const speciesData = await speciesResponse.json();
    
    setSpeciesDetails(speciesData)

  } catch (error) {
    console.error('Error:', error);
  }
};