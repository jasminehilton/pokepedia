import React from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import ShinyIcon from "./ShinyIcon";
import "../styles/ShinyButton.css";

const ShinyButton = (props) => {
  const dispatch = usePokemonDataDispatchContext();
  let selectedClass = "grey-shiny";
  if (props.isShiny) {
    selectedClass = "shiny";
  }

  const toggleShiney = (pokemon_id, collection_id, isShiny) => {
    if (collection_id !== null && isShiny === true) {
      dispatch({
        type: "REMOVE_CAUGHT_SHINY",
        payload: { collection_id: collection_id, pokemonId: pokemon_id },
      });
    } else if (collection_id !== null) {
      dispatch({
        type: "SET_CAUGHT_SHINY",
        payload: { collection_id: collection_id, pokemonId: pokemon_id },
      });
    } else {
      dispatch({
        type: "SET_CAUGHT_SHINY",
        payload: { collection_id: null, pokemonId: pokemon_id },
      });
    }
  };
  return (
    <ShinyIcon
      className={selectedClass}
      onClick={() => {
        toggleShiney(props.pokemon_id, props.collection_id, props.isShiny);
      }}
      isShiny={props.isShiny}
    />
  );
};

export default ShinyButton;
