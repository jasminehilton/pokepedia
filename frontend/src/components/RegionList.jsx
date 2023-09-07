import React, { useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import axios from "axios";
import RegionListItem from "./RegionListItem";

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
    <div className="App">
      1. Region List
      {/* <div>2. Selected region is - {selectedRegion?.name}</div> */}
      <div>
        {/* 3. Selected Region - {regions.length} */}
        {state.regionsData.map((region, index) => (
          <div key={index}>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegionList;
