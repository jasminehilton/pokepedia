import "./App.css";
import TypeButtonList from "./components/TypeButtonList";
import { useEffect } from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "./providers/pokeProvider";
// import PokemonInfo from './components/PokemonInfo';
import PokemonList from "./components/PokemonList";
// import useCollections from './hooks/useCollections';
import filterPokemon from "./helpers/filter";
import getDisplayedPokemon from "./helpers/getDisplayedPokemon";
import RegionList from "./components/RegionList";



function App() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

  useEffect(() => {
    filterPokemon(dispatch, state.filters.types, state.pokemonData, state.pokemonByRegion)
  }, [state.filters.types, state.pokemonByRegion])

  useEffect(() => {
    getDisplayedPokemon(state.pokemonData, state.filteredPokemonData, state.currentPage, state.itemsPerPage, dispatch);
  }, [state.filteredPokemonData, state.pokemonData, state.currentPage, state.filters.regions])

  return (
    <div>
      <RegionList />
      <TypeButtonList />
      <PokemonList />
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
    </div>
  );
}

export default App;
