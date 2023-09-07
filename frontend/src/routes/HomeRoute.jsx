import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import PokemonList from "../components/PokemonList";
import PokemonFooter from "../components/PokemonFooter";
import PokemonLogo from "../components/PokemonLogo";
import handlePageChange from "../helpers/handlePageChange";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";


const HomeRoute = () => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  useEffect(() => {
    fetchPokemonData(dispatch);
  }, []);

  return (
    <div>
      {state.isLoading ? (
        <Spinner />
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <div>
          <Pagination
            next={() =>
              handlePageChange(
                dispatch,
                state.currentPage + 1,
                state.itemsPerPage,
                state.pokemonData.length
              )
            }
            prev={() =>
              handlePageChange(
                dispatch,
                state.currentPage - 1,
                state.itemsPerPage,
                state.pokemonData.length
              )
            }
          />
          <PokemonLogo />
          <PokemonList />
          <PokemonFooter />
        </div>
      )}
    </div>
  );
};

export default HomeRoute;