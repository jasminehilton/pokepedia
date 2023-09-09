import React from "react";

const PokemonEvolutions = (chain) => {
	const evolutions = [];

	const renderChain = (chain) => {
		evolutions.push(
			<div className="evol-child-green" >
				<h3 className="evol-child-black">{chain.species.name}</h3>
				<img
					className="evol-child-purple"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.species.url
						.split("/")
						.slice(-2, -1)}.png`}
					alt={chain.species.name}></img>
				<h4 className="evol-child-orange">
					{chain.evolution_details.map(
						(evolutionDetail, evolutionDetailIndex) => (
							<div>Level: {evolutionDetail.min_level}</div>
						)
					)}
				</h4>
			</div>
		);

		if (chain.evolves_to.length > 0) {
			chain.evolves_to.forEach((evolution) => {
				renderChain(evolution);
			});
		}
	};

	renderChain(chain);

	return <div className="evol-child-white">{evolutions}</div>;
};

export default PokemonEvolutions;
