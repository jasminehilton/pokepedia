import React from "react";

function RegionListItem({ pokemonByRegion }) {
	return (
		<div className="App">
			<div>
				{/* Total Pokemon Count: {pokemonByRegion.length} */}
				{/* {pokemonByRegion.map((pokemon, index) => ( */}

        {pokemonByRegion.map((pokemon, index) => (
          
					<div key={index}>{pokemon.name}</div>
				))}

			</div>
		</div>
	);
}

export default RegionListItem;
