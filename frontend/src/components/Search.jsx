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

  const handleSearch = (event) => { //Updates the searchWords state on enter key
    if (event.key === "Enter") {
      let splitString = searchInput.split(" "); //splits the searchInput into usable array of strings
      let stringArray = [];
      for(let i = 0; i < splitString.length; i++) { //removing spaces and pushes words into new array
        if(splitString[i] !== "") {
          stringArray.push(splitString[i]);
        }
      }
      dispatch({ type: "INITIATE_SEARCH", searchWords: stringArray });
      doSearch();
    }
  };


  const doSearch = () => {
    const selectedTypes = state.filters.types;
    const includesType = state.typesData.some((type) => state.searchWords.includes(type));

    if (includesType) {
      const newTypesToAdd = state.searchWords.filter((type) => !selectedTypes.includes(type)); // Find types in searchWords that are not in selectedTypes
      if (newTypesToAdd.length > 0) {
        const updatedSelectedTypes = [...selectedTypes, ...newTypesToAdd]; // Update the state.filters.types with the new types
        dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: updatedSelectedTypes }); // Dispatch the action to add/update the type filter
      };
    };

  };

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




