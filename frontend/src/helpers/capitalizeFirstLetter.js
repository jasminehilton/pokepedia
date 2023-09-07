const capitalizeFirstLetter = (pokemonName) => {
  return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

export default capitalizeFirstLetter;