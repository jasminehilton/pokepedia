// export const fetchGender = async (pokemonData, setGender) => {
//   try {
//     const genderResponse = await fetch(pokemonData);
//     if (!genderResponse.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const genderData = await genderResponse.json();
    
//     setGender(genderData)

//   } catch (error) {
//     console.error('Error:', error);
//   }
// };