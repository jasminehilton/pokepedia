import React, { useContext } from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";

const Search = () => {
  const state = usePokemonDataContext(); // Access context state
  const dispatch = usePokemonDataDispatchContext(); // Access context dispatch

  const handleSearchInputChange = (event) => {
    dispatch({ type: "INITIATE_SEARCH", searchInput: event.target.value });
  };

  const handleSearchButtonClick = () => {
    // Implement your logic for showing/hiding the search bar if needed
  };

  const handleSearch = () => {
    console.log("Searching for:", state.searchInput);
    // Implement your search logic here using state.searchInput
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <div>
      <button
        className="bigYellowButton"
        onClick={handleSearchButtonClick}
      >
        Search
      </button>
      {state.isSearchBarVisible && (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={state.searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown} // Use onKeyDown for Enter key
          />
          <button className="bigYellowButton" onClick={handleSearch}></button>
        </div>
      )}
    </div>
  );
};

export default Search;




