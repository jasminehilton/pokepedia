import React, { useContext, useState, useEffect } from "react";
import {
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

  const doSearch = () => {
    const includesType = state.typesData.some((type) => state.searchWords.includes(type));
  
    if (includesType) {
      const updatedSelectedTypes = [...state.searchWords]; // Create a new array with the search types
      dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: updatedSelectedTypes });
    } else {
      // If there are no matching types, you can clear the type filter or handle it as needed
      dispatch({ type: "CLEAR_TYPE_FILTER", selectedTypes: [] });
    }
  };

  const handleSearch = (event) => { //Updates the searchWords state on enter key
    if (event.key === "Enter") {
      doSearch();
    }
  };

// this version below accounts for already pressed buttons

  // const doSearch = () => {
  //   const selectedTypes = state.filters.types;
  //   const includesType = state.typesData.some((type) => state.searchWords.includes(type));
  //   if (includesType) {
  //     const newTypesToAdd = state.searchWords.filter((type) => !selectedTypes.includes(type)); // Find types in searchWords that are not in selectedTypes
  //     if (newTypesToAdd.length > 0) {
  //       const updatedSelectedTypes = [...selectedTypes, ...newTypesToAdd]; // Update the state.filters.types with the new types
  //       dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: updatedSelectedTypes }); // Dispatch the action to add/update the type filter
  //     };
  //   };
  // };

  useEffect(() => { //Displays the search words state
    console.log("Updated searchWords:", state.searchWords);
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
            onKeyDown={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Search;




