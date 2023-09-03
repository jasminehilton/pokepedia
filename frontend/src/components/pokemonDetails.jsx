const PokemonDetails = (props) => {
  const pokemon = props.pokemon;
  const locations = props.locations;

  if (!pokemon || !locations) {
    // Loading state: Display a loading indicator or message
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p>Id: {pokemon.id}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Locations:</p>
      <ul>
      {locations.map((location, index) => (
          <li key={index}>{location.location_area.name} - {location.version_details[0].version.name}</li>
        ))}
      </ul>
      <p>Weaknesses:</p>
  
      <p>Abilities:</p>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <p>Types:</p>
      <ul>
        {pokemon.types.map((type, index) => (
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
      <p>Held Items:</p>
      <ul>
        {pokemon.held_items.map((item, index) => (
          <li key={index}>
            {item.item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonDetails;
