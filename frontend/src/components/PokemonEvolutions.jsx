import React from "react";

const PokemonEvolutions = (chain) => {
  const evolutions = [];

  const renderChain = (chain) => {
    evolutions.push(
      <h3 className="modal-evol-picture" key={chain.species.name}>
        {chain.species.name}
        <img
          // className="modal-evol-picture"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.species.url.split('/').slice(-2, -1)}.png`}
          alt={chain.species.name}
        />
        {chain.evolution_details.map((evolutionDetail, evolutionDetailIndex) => (
          <ul key={evolutionDetailIndex}>
            <p>Level: {evolutionDetail.min_level}</p>
          </ul>
        ))}
      </h3>
    );

    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => {
        renderChain(evolution);
      });
    }
  };

  renderChain(chain);

  return evolutions;
};

export default PokemonEvolutions;
