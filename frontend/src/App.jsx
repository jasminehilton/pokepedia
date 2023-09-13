import "./App.css";
import { useEffect } from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "./providers/pokeProvider";
// import PokemonInfo from './components/PokemonInfo';
// import useCollections from './hooks/useCollections';
import filterPokemon from "./helpers/filter";
import getDisplayedPokemon from "./helpers/getDisplayedPokemon";
import "./styles/Navbar.css";
import HomeRoute from "./routes/HomeRoute";
import fetchCollectionForUser from "./helpers/fetchCollection";
import doSearch from "./helpers/doSearch";

function App() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

  useEffect(() => {
    fetchCollectionForUser(dispatch, 1);
  }, []);


  useEffect(() => {
    filterPokemon(
      dispatch,
      state.filters.types,
      state.pokemonData,
      state.pokemonByRegion,
      state.collectionPokemon,
      state.myCollectionSelected
    );
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });

    if (state.searchWords.length > 0) {
      doSearch(state, dispatch)
    }
  }, [state.filters.types, state.pokemonByRegion, state.searchWords, state.myCollectionSelected]);

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

  useEffect(() => {
    if (state.isNew === true) {
      fetchCollectionForUser(dispatch, 1);
      dispatch({ type: "SET_IS_NEW", payload: false });
    }
  }, [state.isNew]);

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
