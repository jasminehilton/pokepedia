import React from "react";
import useRegion from "../hooks/useRegion";

function Regions() {
	const { regions, selectedRegion, pokemonByRegion, setSelectedRegion } =
		useRegion();

	return (
		<div className="App">
			{regions.map((region, index) => (
				<button key={index} onClick={() => setSelectedRegion(region)}>
					{region.name}
				</button>
			))}

			<div>selected region is - {selectedRegion?.name}</div>

			<div>
				Selected Region Pokemons - {pokemonByRegion.length}
				{pokemonByRegion.map((pokemon, index) => (
					<div key={index}>{pokemon.name}</div>
				))}
			</div>
		</div>
	);
}

export default Regions;
