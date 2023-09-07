import React, { useEffect } from "react";
import fetchPokemonData from "../helpers/fetchPokemonData";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import PokemonModal from "../routes/PokemonModal";
import PokemonListItem from "./PokemonListItem";
import Pagination from "./Pagination";
import handlePageChange from "../helpers/handlePageChange";
import PokemonLogo from "./PokemonLogo";
import { MetroSpinner } from "react-spinners-kit";
import "../styles/PokemonSpinner.css";
import PokemonFooter from "./PokemonFooter";
import "../styles/PokemonFooter.css";

const PokemonList = ({ isOpen, onClose }) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const onDisplayPokemonModal = (pokemon) => {
    dispatch({ type: "DISPLAY_POKEMON_DATA", payload: pokemon });
  };

  useEffect(() => {
    fetchPokemonData(dispatch);
  }, []);

  return (
    <div>
      {state.isLoading ? (
        <div className="spinnerContainer">
          <div className="spinner"><MetroSpinner size={40} color="white" />
            <p>Loading...</p>
          </div>
        </div>
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
          <div className="pokemon-container">
            {state.displayedPokemon.map((pokemon, index) => (
              <PokemonListItem
                key={index}
                pokemon={pokemon}
                onDisplayPokemonModal={onDisplayPokemonModal}
              />
            ))}
          </div>
          <PokemonFooter />
        </div>
      )}
      {state.isModalVisible && <PokemonModal />}
    </div>
  );
};

export default PokemonList;
