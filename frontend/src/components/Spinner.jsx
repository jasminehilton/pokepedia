import React from 'react';
import "../styles/PokemonSpinner.css";
import { MetroSpinner } from 'react-spinners-kit';

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"><MetroSpinner size={70} color="white" />
        <h1 className="spinner">Loading</h1>
      </div>
    </div>
  )
}

export default Spinner;