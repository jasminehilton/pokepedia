import React, { useContext, useState, useEffect } from "react";
import {
  PokemonDataProvider,
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
// import TypeButtonList from "./TypeButtonList";

const Search = () => {
  const state = usePokemonDataContext();
  const dispatch = usePokemonDataDispatchContext();
  const [searchInput, setSearchInput] = useState(""); //Stores the search text

  const searchButtonClick = () => { //Toggles the search bar visibility
    dispatch({ type: state.isSearchBarVisible ? "CLOSE_POKEMON_SEARCH" : "DISPLAY_POKEMON_SEARCH" });
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value); // Update the search input value
  };

  useEffect(() => {
    const splitString = searchInput
      .split(" ")
      .filter(Boolean)
      .map((word) => word.toLowerCase()); // Split up the search input, remove spaces, and convert to lowercase

    dispatch({ type: "INITIATE_SEARCH", searchWords: splitString });
  }, [searchInput, dispatch]);

  useEffect(() => { //Displays the search words state
    // console.log("Updated searchWords:", state.searchWords);
  }, [state.searchWords]);


  return (
    <div>
      <button className="bigYellowButton" onClick={searchButtonClick}>Search</button>
      {state.isSearchBarVisible && (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
            // onKeyDown={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Search;




