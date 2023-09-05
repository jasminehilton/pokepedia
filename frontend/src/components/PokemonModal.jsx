import React from "react";

const PokemonModal = ({ pokemon, onClose }) => {
  return (
    <div className="pokemon-modal">
      <div className="pokemon-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{pokemon.name}</h2>
        <p>ID: {pokemon.id}</p>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name} />
      </div>
    </div>
  );
};

export default PokemonModal;
