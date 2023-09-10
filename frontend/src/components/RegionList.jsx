import React, { useState, useEffect } from "react";
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
import LoginModal from "../routes/LoginModal";

const P = new Pokedex();

function RegionList() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // console.log("load the pokemon regions now");
    getRegions(P, dispatch);
  }, []);

  useEffect(() => {
    if (state.filters.regions.name) {
      getPokemonsByRegion(state.filters.regions, dispatch);
    }
  }, [state.filters.regions]);

  const onDisplayLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="regionList">
      <button className="bigBlueButton">Regions</button>
      <div className="regionsButtonsList">
        {state.regionsData.map((region, index) => (
          <RegionListItem
            key={index}
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
        <button
          className="bigGreenButton"
          onClick={onDisplayLogin}
        >
          Login
        </button>
        <button className="bigYellowButton">Search</button>
      </div>
      {showLogin &&
        <LoginModal
          toggleModal={onDisplayLogin}
          showLogin={showLogin}
        />}
    </div>
  );
}

export default RegionList;

