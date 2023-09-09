import React, { useContext, useEffect } from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";

const Search = () => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();

  const searchButtonClick = () => { //Toggles the search bar
    dispatch({ type: state.isSearchBarVisible ? "CLOSE_POKEMON_SEARCH" : "DISPLAY_POKEMON_SEARCH" });
  };

  const handleSearch = (event) => { //Changes the state on enter key
    if (event.key === "Enter") {
      dispatch({ type: "INITIATE_SEARCH", searchInput: event.target.value });
    }
  };

  useEffect(() => { //Displays the search input
    console.log("Updated searchInput:", state.searchInput);
  }, [state.searchInput]);


  return (
    <div>
      <button className="bigYellowButton" onClick={searchButtonClick}>Search</button>
      {state.isSearchBarVisible && (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={state.searchInput}
            onKeyDown={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Search;




