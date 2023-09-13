import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import TypeButton from "./TypeButton";
import "../styles/Navbar.css";
import RegistrationModal from "../routes/RegistrationModal";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import myCollectionSelected from "../helpers/setMyCollectionSelected";

const TypeButtonList = () => {
  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch
  const [showRegistration, setShowRegistration] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // console.log('Selected types:', state.filters.types);
  }, [state.filters.types]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        const typesDataArray = response.data.results
          .map((type) => type.name)
          .filter((type) => type !== "shadow" && type !== "unknown");
        dispatch({ type: "FETCH_TYPES", typesData: typesDataArray });
        // console.log(typesDataArray);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon types data:", error);
      });
  }, []);

  const onDisplayRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setAuthUser(authUser);
        dispatch({ type: "LOGIN_SUCCESS" });
      } else {
        setAuthUser(null);
        dispatch({ type: "LOGOUT" });
      }
    });
    return () => listen();
  }, []);

  const onTypeSelect = (typeName) => {
    const selectedTypes = state.filters.types;
    if (selectedTypes.includes(typeName)) {
      const selected = selectedTypes.filter((type) => type !== typeName);
      dispatch({ type: "CLEAR_TYPE_FILTER", selectedTypes: selected });
    } else {
      const selected = [...selectedTypes, typeName];
      dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: selected });
    }
  };

  return (
    <div className="typesList">
      <button className="bigBlueButton">Types</button>
      <div className="typesButtonsList">
        {state.typesData.map((type) => (
          <TypeButton
            key={type}
            typeName={type}
            onTypeSelect={() => onTypeSelect(type)}
          />
        ))}
      </div>
      <div className="rightBigButtons">
        {!authUser && (
          <button
            className="bigGreenButton"
            onClick={() => onDisplayRegistration()}
          >
            Register
          </button>
        )}
        {state.isLoggedIn === true && (
          <button
            className="bigYellowButton"
            onClick={() =>
              myCollectionSelected(dispatch, state.myCollectionSelected)
            }
          >
            Collection
          </button>
        )}
      </div>
      {showRegistration && (
        <RegistrationModal
          showRegistration={showRegistration}
          toggleModal={onDisplayRegistration}
        />
      )}
    </div>
  );
};

export default TypeButtonList;
