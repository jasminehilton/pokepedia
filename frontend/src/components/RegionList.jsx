import React, { useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import getRegions from "../helpers/fetchRegions";
import setSelectedRegion from "../helpers/setSelectedRegion";
import getPokemonsByRegion from "../helpers/fetchPokemonByRegion";
import "../styles/RegionList.css"

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
			<button className="regionsButton">Regions</button>
        {state.regionsData.map((region, index) => (
					<React.Fragment key={index}>
            <button
              onClick={() =>
                setSelectedRegion(
                  region,
                  dispatch,
                  state.filters.regions
                )
              }
            >
              {region.name}
            </button>
						</React.Fragment>
        ))}
			</div>
  );
}

export default RegionList;