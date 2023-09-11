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
import Search from "./Search";
import LoginModal from "../routes/LoginModal";
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from '../firebase';

const P = new Pokedex();

function RegionList() {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch
  const [showLogin, setShowLogin] = useState(false);
  const [authUser, setAuthUser] = useState(null);

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

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setAuthUser(authUser)
        dispatch({ type: "LOGIN_SUCCESS" });
      } else {
        setAuthUser(null)
        dispatch({ type: "LOGOUT" });

      }
    });
    return () => listen();
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed Out');
      setAuthUser(null);
    }).catch((error) => {
      console.log(error);
    });
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
        {authUser ? (
          <div>
            <button className="bigGreenButton" onClick={userSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <button
          className="bigGreenButton"
          onClick={onDisplayLogin}
          >
            Login
          </button>
        )}
        <Search />
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

