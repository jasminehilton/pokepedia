import React from "react";

function RegionListItem({ pokemonByRegion }) {
  return (
    <div className="App">
      <div>
        Selected Region Pokemons - {pokemonByRegion.length}
        {pokemonByRegion.map((pokemon, index) => (
          <div key={index}>{pokemon.name}</div>
        ))}
      </div>
    </div>
  );
}

export default RegionListItem;