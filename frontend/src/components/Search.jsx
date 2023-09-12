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

  const doSearch = () => {
    const includesType = state.typesData.some((type) => state.searchWords.includes(type));
    const includesRegion = state.regionsData.some((region) => state.searchWords.includes(region.name));
    const includesId = state.searchWords.some((word) => !isNaN(word));
    console.log(includesId);
    console.log(state.pokemonData);
    // console.log(state.searchWords)
    console.log(state.filteredPokemonData);


    if (includesType) {
      const types = state.searchWords.filter((word) => state.typesData.includes(word));
      dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: types });
    } else {
      dispatch({ type: "CLEAR_TYPE_FILTER", selectedTypes: [] });
    }

    if (includesRegion) {
      const region = state.regionsData.filter((region) => state.searchWords[0] === region.name);
      dispatch({ type: "ADD_REGION_FILTER", payload: region[0] });
    } else {
      dispatch({ type: "CLEAR_REGION_FILTER", selectedRegions: {} });
    }

    if (includesId) {
      console.log("Id is:", state.searchWords);
      const searchId = parseInt(state.searchWords.find((word) => !isNaN(word)), 10);
      console.log("Search ID is:", searchId);
      let findById = state.pokemonData.find((pokemon) => pokemon.id === searchId)
      console.log(findById)
      if (findById) {
        dispatch({ type: "SEARCH_SPECIFIC_POKEMON", payload: findById });
        console.log("SUCCESS+++++", state.filteredPokemonData)
      } else {
        console.log(`No Pokémon found with ID: ${searchId}`);
      }
    } else {
      console.log("Name is:", state.searchWords);
      const searchName = state.searchWords.find((word) => isNaN(word));
      console.log("Search name is:", searchName);
      const findByName = state.pokemonData.find((pokemon) => pokemon.name === searchName)
      console.log(findByName)
      if (findByName) {
        dispatch({ type: "SEARCH_SPECIFIC_POKEMON", payload: findByName });
        console.log("SUCCESS+++++", state.filteredPokemonData)
      } else {
        console.log(`No Pokémon found with name: ${searchName}`);
      }
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
            onKeyDown={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Search;




