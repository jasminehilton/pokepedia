// https://pokeapi.co/api/v2/gender/1/
export const fetchFemale = async (pokemonData, setFemale) => {
  try {
    const femaleResponse = await fetch("https://pokeapi.co/api/v2/gender/1/");
    if (!femaleResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const femaleData = await femaleResponse.json();
    console.log("femaleData", femaleData)
    setFemale(femaleData)

  } catch (error) {
    console.error('Error:', error);
  }
};

// https://pokeapi.co/api/v2/gender/2/
export const fetchMale = async (pokemonData, setMale) => {
  try {
    const maleResponse = await fetch("https://pokeapi.co/api/v2/gender/2/");
    if (!maleResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const maleData = await maleResponse.json();
    
    setMale(maleData)

  } catch (error) {
    console.error('Error:', error);
  }
};

// https://pokeapi.co/api/v2/gender/3/
export const fetchGenderless = async (pokemonData, setGenderless) => {
  try {
    const genderlessResponse = await fetch("https://pokeapi.co/api/v2/gender/3/");
    if (!genderlessResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const genderlessData = await genderlessResponse.json();
    
    setGenderless(genderlessData)

  } catch (error) {
    console.error('Error:', error);
  }
};