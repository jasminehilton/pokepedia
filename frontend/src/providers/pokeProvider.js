import { createContext, useContext } from "react";
import { usePokemonData } from "./hooks/reducer.js";

const PokemonDataContext = createContext();

export const usePokemonDataContext = () => {
  return useContext(PokemonDataContext);
};

export const PokemonDataProvider = ({ children }) => {
  const { state, dispatch } = usePokemonData();

  return (
    <PokemonDataContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonDataContext.Provider>
  );
};
