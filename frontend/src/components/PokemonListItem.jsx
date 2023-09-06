import React from "react";

const PokemonListItem = ({ pokemon, onDisplayPokemonModal }) => {

  return (
    <div>
      <h5>ID: {pokemon.id}</h5>
      <div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{ width: "100px", height: "100px", cursor: "pointer" }}
          onClick={() => onDisplayPokemonModal(pokemon)}
        />
      </div>
      <h2>{pokemon.name}</h2>
    </div>
  );
};

export default PokemonListItem;