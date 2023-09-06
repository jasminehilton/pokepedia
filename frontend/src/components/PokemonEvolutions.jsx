import React from "react";

const PokemonEvolutions = (chain) => {
  const evolutions = [];

  const renderChain = (chain) => {
    evolutions.push(
      <h3 key={chain.species.name}>
        {chain.species.name}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/').slice(-2, -1)}.png`}
          alt={chain.species.name}
        />
        {/* {chain.evolution_details.map((evolutionDetail, evolutionDetailIndex) => (
          <ul key={evolutionDetailIndex}> */}
            {/* <p>Item: {evolutionDetail.item && evolutionDetail.item.name}</p> */}
            {/* <p>Trigger: {evolutionDetail.trigger.name}</p> */}
          {/* </ul> */}
        {/* // ))} */}
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
