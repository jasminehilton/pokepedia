import React from "react";
import { usePokemonDataContext } from '../providers/pokeProvider';
import "../styles/RegionButtons.css";

function RegionListItem({ setSelectedRegion, regionName }) {
  const state = usePokemonDataContext(); //imports the state

  const buttonClassName = state.filters.regions.name === regionName.toLowerCase() ?
    `region-button ${regionName} selected` : `region-button`;

  return (
    <button className={buttonClassName} onClick={setSelectedRegion}>
      {regionName}
    </button>
  );
}

export default RegionListItem;