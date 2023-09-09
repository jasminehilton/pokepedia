import React, { useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import getRegions from "../helpers/fetchRegions";
import setSelectedRegion from "../helpers/setSelectedRegion";
import getPokemonsByRegion from "../helpers/fetchPokemonByRegion";
import "../styles/Navbar.css"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import RegionListItem from "./RegionListItem";

const P = new Pokedex();

function RegionList() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

  useEffect(() => {
    // console.log("load the pokemon regions now");
    getRegions(P, dispatch);
  }, []);

  useEffect(() => {
    if (state.filters.regions.name) {
      getPokemonsByRegion(state.filters.regions, dispatch);
    }
  }, [state.filters.regions]);

  return (
    <div className="regionList">
      <button className="bigBlueButton">Regions</button>
      <div className="regionsButtonsList">
        {state.regionsData.map((region) => (
          <RegionListItem
            key={region.id}
            regionName={capitalizeFirstLetter(region.name)}
            setSelectedRegion={() =>
              setSelectedRegion(
                region,
                dispatch,
                state.filters.regions
              )}
          />
        ))}
      </div>
      <div className="rightBigButtons">
        <button className="bigGreenButton">Login</button>
        <button className="bigYellowButton">Search</button>
      </div>
    </div>
  );
}

export default RegionList;

