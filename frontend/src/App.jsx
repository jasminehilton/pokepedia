import "./App.css";
import TypeButtonList from "./components/TypeButtonList";
import { useEffect } from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "./providers/pokeProvider";
// import PokemonInfo from './components/PokemonInfo';
// import useCollections from './hooks/useCollections';
import filterPokemon from "./helpers/filter";
import getDisplayedPokemon from "./helpers/getDisplayedPokemon";
import RegionList from "./components/RegionList";
import HomeRoute from "./routes/HomeRoute";
import axios from "axios";

function App() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

  useEffect(() => {
    filterPokemon(
      dispatch,
      state.filters.types,
      state.pokemonData,
      state.pokemonByRegion
    );
  }, [state.filters.types, state.pokemonByRegion]);

  useEffect(() => {
    getDisplayedPokemon(
      state.pokemonData,
      state.filteredPokemonData,
      state.currentPage,
      state.itemsPerPage,
      dispatch
    );
  }, [
    state.filteredPokemonData,
    state.pokemonData,
    state.currentPage,
    state.filters.regions,
  ]);

  const collectionObj = { caught_normal: true, caught_shiney: false };
  const dataObj = {
    collectionObj,
    pokemon_id: 5,
  };
  useEffect(() => {
    axios
      .post("http://localhost:8080/collection/1/create", dataObj)
      .then((res) => {
        console.log("Response:", res);
      });
  }, []);

  return (
    <div className="App">
      <RegionList />
      <TypeButtonList />
      <HomeRoute />
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
      {/* <PokemonFooter /> */}
    </div>
  );
}

export default App;
