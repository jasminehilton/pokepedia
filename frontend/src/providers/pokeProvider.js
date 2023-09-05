import { createContext, useContext } from "react";
import usePokemonData from "../hooks/reducer.js";

const PokemonDataContext = createContext();
const PokemonDispatchContext = createContext();

function usePokemonDataContext () {
  return useContext(PokemonDataContext);
};

function usePokemonDataDispatchContext () {
  return useContext(PokemonDispatchContext);
};

function PokemonDataProvider (props) {
  const { state, dispatch } = usePokemonData();

  return (
    <PokemonDataContext value={state}>
      <PokemonDispatchContext.Provider value={dispatch}>
        {props.children}
      </PokemonDispatchContext.Provider>
    </PokemonDataContext>
  );
};

export {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
  PokemonDataProvider
};