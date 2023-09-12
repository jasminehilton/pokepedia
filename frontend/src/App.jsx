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
import "./styles/Navbar.css";
import HomeRoute from "./routes/HomeRoute";
import PokemonLogo from "./components/PokemonLogo";
import doSearch from "./helpers/doSearch";

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
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });

    if (state.searchWords.length > 0) {
      doSearch(state, dispatch)
    }
  }, [state.filters.types, state.pokemonByRegion, state.searchWords]);
    
  // useEffect(() => {
  //   doSearch(state, dispatch)
  // }, [state.searchWords]);

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
    state.isLoggedIn,
  ]);

  return (
    <div className="App">
      {/* <SignIn />
      <SignUp />
      <AuthDetails /> */}
      {/* <RegionList />
      <TypeButtonList /> */}
      <HomeRoute />
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
      {/* <PokemonFooter /> */}
    </div>
  );
}

export default App;
