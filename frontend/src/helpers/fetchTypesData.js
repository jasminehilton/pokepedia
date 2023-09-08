export const fetchTypesData = async (pokemonData, setTypesDetails) => {
  try {
    const typesResponse = await fetch(pokemonData.types[0].type.url);
    if (!typesResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const typesData = await typesResponse.json();
    console.log("typesData = ",typesData)
    setTypesDetails(typesData)

  } catch (error) {
    console.error('Error:', error);
  }
};