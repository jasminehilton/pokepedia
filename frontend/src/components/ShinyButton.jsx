import React from "react";
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import ShinyIcon from "./ShinyIcon"

const ShinyButton = (props) => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const toggleShiney = (pokemon_id, collection_id, isShiny) => {
    if (collection_id !== null && isShiny === true) {
      dispatch({type: 'REMOVE_CAUGHT_SHINY', payload: { collection_id: collection_id, pokemonId: pokemon_id}})
    } else if (collection_id !== null) {
      dispatch({ type: 'SET_CAUGHT_SHINY', payload: { collection_id: collection_id, pokemonId: pokemon_id}})
    } else {
      dispatch({ type: 'SET_CAUGHT_SHINY', payload: { collection_id: null, pokemonId: pokemon_id}})
    }
  }
  return (
    <button onClick={() => {
      toggleShiney(props.pokemon_id, props.collection_id, props.isShiny)
    }}> Shinyyyy </button>
  )
}