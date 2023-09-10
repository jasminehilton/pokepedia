
export const fetchFemale = async (femaleData, setFemale) => {
  try {
    const femaleResponse = await fetch("https://pokeapi.co/api/v2/gender/1/");
    if (!femaleResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const femaleData = await femaleResponse.json();

    setFemale(femaleData)

  const femaleArray = femaleData.pokemon_species_details.map((pokemon_species) => pokemon_species.pokemon_species.name).join(', ')

  console.log("femaleArray =", femaleArray)
  } catch (error) {
    console.error('Error:', error);
  }
};


export const fetchMale = async (maleData, setMale) => {
  try {
    const maleResponse = await fetch("https://pokeapi.co/api/v2/gender/2/");
    if (!maleResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const maleData = await maleResponse.json();
    
    setMale(maleData)

    const maleArray = maleData.pokemon_species_details.map((pokemon_species) => pokemon_species.pokemon_species.name).join(', ')

    console.log("maleArray =", maleArray)

  } catch (error) {
    console.error('Error:', error);
  }
};


export const fetchGenderless = async (genderlessData, setGenderless) => {
  try {
    const genderlessResponse = await fetch("https://pokeapi.co/api/v2/gender/3/");
    if (!genderlessResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const genderlessData = await genderlessResponse.json();
    
    setGenderless(genderlessData)

    const genderlessArray = genderlessData.pokemon_species_details.map((pokemon_species) => pokemon_species.pokemon_species.name).join(', ')

    console.log("genderlessArray =", genderlessArray)

  } catch (error) {
    console.error('Error:', error);
  }
};