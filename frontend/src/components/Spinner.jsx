import React from 'react';
import "../styles/PokemonSpinner.css";
import { MetroSpinner } from 'react-spinners-kit';

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"><MetroSpinner size={90} color="white" />

      </div>
      <h1 className="spinner-loading-label">Loading</h1>
    </div>
  )
}

export default Spinner;