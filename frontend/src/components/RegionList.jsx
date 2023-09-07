import React, { useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import RegionListItem from "./RegionListItem";
import { usePokemonDataContext, usePokemonDataDispatchContext} from '../providers/pokeProvider';
import getRegions from '../helpers/fetchRegions';
import setSelectedRegion from "../helpers/setSelectedRegion";
import getPokemonsByRegion from "../helpers/fetchPokemonByRegion";

const P = new Pokedex();

function RegionList() {
	const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch

	useEffect(() => {
		console.log("load the pokemon regions now");
		getRegions(P, dispatch,);
	}, []);

  useEffect(() => {
    if(state.filters.regions) {
      getPokemonsByRegion(state.filters.regions, dispatch);
    }
  }, [state.filters.regions])

	return (

<div className="App">
      1. Region List
      {/* <div>2. Selected region is - {selectedRegion?.name}</div> */}
        <div>
          {/* 3. Selected Region - {regions.length} */}
          {state.regionsData.map((region, index) => (
            <div key={index}>
              <button onClick={() => setSelectedRegion(region, dispatch, state.filters.regions)}>
                {region.name}
              </button>
              {state.filters.regions === region && (
                <RegionListItem pokemonByRegion={'beans'} />
              )}
            </div>
          ))}
        </div>
      
    </div>
	);
}

export default RegionList;