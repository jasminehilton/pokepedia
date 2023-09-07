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
import "../styles/RegionButton.css";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

const P = new Pokedex();

function RegionList() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

  useEffect(() => {
    console.log("load the pokemon regions now");
    getRegions(P, dispatch);
  }, []);

  useEffect(() => {
    if (state.filters.regions.name) {
      getPokemonsByRegion(state.filters.regions, dispatch);
    }
  }, [state.filters.regions]);

  return (
		<div className="regionList">
      <div>
      <button className="bigButton">Regions</button>
      </div>
        <div className="regionsButtonsList">
          {state.regionsData.map((region, index) => (
            <React.Fragment key={index}>
              <button className="region-button"
                onClick={() =>
                  setSelectedRegion(
                    region,
                    dispatch,
                    state.filters.regions
                  )
                }
              >
                {capitalizeFirstLetter(region.name)}
              </button>
              </React.Fragment>
          ))}
        </div>
      </div>
  );
}

export default RegionList;

