import React from "react";
import { usePokemonDataContext } from '../providers/pokeProvider';
function RegionListItem() {
  const state = usePokemonDataContext(); //imports the state

  return (
    <div className="App">
      <div>
        Selected Region Pokemons - {state.pokemonByRegion.length}
        {state.pokemonByRegion.map((pokemon, index) => (
          <div key={index}>{pokemon.name}</div>
        ))}
      </div>
    </div>
  );
}

export default RegionListItem;