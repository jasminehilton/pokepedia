import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import PokemonList from "../components/PokemonList";
import PokemonFooter from "../components/PokemonFooter";
// import PokemonLogo from "../components/PokemonLogo";
import handlePageChange from "../helpers/handlePageChange";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import RegionList from "../components/RegionList";
import TypeButtonList from "../components/TypeButtonList";
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
<<<<<<< HEAD
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
          {/* <PokemonLogo /> */}
=======
          <div className="logo-region-type-pagination">
            <PokemonLogo />
            <div>
              <RegionList />
              <TypeButtonList />
            </div>
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
            </div>
          </div>
>>>>>>> 5f7427b0da0db923088869dc0f26ed5095908f08
          <PokemonList />
          <PokemonFooter />
        </div>
      )}
    </div>
  );
};

export default HomeRoute;