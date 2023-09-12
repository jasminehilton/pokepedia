import React from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import NormalIcon from "./NormalIcon";

const NormalButton = (props) => {
  const dispatch = usePokemonDataDispatchContext();
  let selectedClass = "grey-normal";
  if (props.isNormal) {
    selectedClass = "normal";
  }

  const toggleNormal = (pokemon_id, collection_id, isNormal) => {
    if (collection_id !== null && isNormal === true) {
      dispatch({
        type: "REMOVE_CAUGHT_NORMAL",
        payload: { collection_id: collection_id, pokemonId: pokemon_id },
      });
    } else if (collection_id !== null) {
      dispatch({
        type: "SET_CAUGHT_NORMAL",
        payload: { collection_id: collection_id, pokemonId: pokemon_id },
      });
    } else {
      dispatch({
        type: "SET_CAUGHT_NORMAL",
        payload: { collection_id: null, pokemonId: pokemon_id },
      });
    }
  };
  return (
    <NormalIcon
      className={selectedClass}
      onClick={() =>
        toggleNormal(props.pokemon_id, props.collection_id, props.isNormal)
      }
      isNormal={props.isNormal}
    />
  );
};

export default NormalButton;
