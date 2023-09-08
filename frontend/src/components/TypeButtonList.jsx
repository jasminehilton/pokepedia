import React, { useEffect } from 'react';
import axios from 'axios';
import { usePokemonDataContext, usePokemonDataDispatchContext } from "../providers/pokeProvider";
import TypeButton from './TypeButton';
import filterPokemon from '../helpers/filter';
import "../styles/Navbar.css"


const TypeButtonList = () => {

  const state = usePokemonDataContext(); //imports the state
  const dispatch = usePokemonDataDispatchContext(); //imports dispatch



  useEffect(() => {
    // console.log('Selected types:', state.filters.types);
  }, [state.filters.types]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then((response) => {
        const typesDataArray = response.data.results.map((type) => type.name);
        dispatch({ type: "FETCH_TYPES", typesData: typesDataArray });
      })
      .catch((error) => {
        console.error('Error fetching Pokemon types data:', error);
      });
  }, []);


  const onTypeSelect = (typeName) => {
    const selectedTypes = state.filters.types;
    if (selectedTypes.includes(typeName)) {
      const selected = selectedTypes.filter((type) => type !== typeName);
      dispatch({ type: "CLEAR_TYPE_FILTER", selectedTypes: selected });
    } else {
      const selected = [...selectedTypes, typeName];
      dispatch({ type: "ADD_TYPE_FILTER", selectedTypes: selected });
    };
  };

  const removedExtraTypesData = state.typesData.filter(
    (type) => type !== "shadow" && type !== "unknown"
  );

  return (
    <div className='typesList'>
      <button className="bigBlueButton">Types</button>
      <div className='typesButtonsList'>
      {removedExtraTypesData.map((type) => (
        <TypeButton
          key={type}
          typeName={type}
          onTypeSelect={() => onTypeSelect(type)}
        />
      ))}
      </div>
      <div className="rightBigButtons">
      <button className="bigGreenButton">Register</button>
      <button className="bigYellowButton">Collection</button>
      </div>
    </div>
  );
};

export default TypeButtonList;