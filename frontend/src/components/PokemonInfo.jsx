import React from 'react';
import usePokemonApi from '../hooks/usePokemon';

function PokemonInfo() {
  const { pokemonData, loading } = usePokemonApi();
  
  return (
    <div>
      <h1>Pokemon Info</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {pokemonData.map((pokemon, index) => (
            <div key={index}>
              <h2>{pokemon.name}</h2>
              <p>Id: {pokemon.id}</p>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Base Experience: {pokemon.base_experience}</p>
              <p>Location:</p>
              <p>Weaknesses:</p>
              <ul>
                {pokemon.types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))}
              </ul>
              <p>Abilities:</p>
              <ul>
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
              <p>Types:</p>

              <ul> {pokemon.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
              </ul>
              <p>Stats:</p>
              <ul>
                {pokemon.stats.map((stat, index) => (
                  <li key={index}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonInfo;
