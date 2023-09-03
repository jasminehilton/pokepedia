import "./App.css";

import PokemonInfo from "./components/PokemonInfo";
import usePokeDetails from "./hooks/usePokeDetails";
import PokemonDetails from "./components/pokemonDetails";
// import useCollections from './hooks/useCollections';

function App() {
  const { pokemonDetails, pokemonLocations, pokemonWeaknesses } = usePokeDetails(200);
  // console.log(pokemonWeaknesses);
  return (
    <div className="App">
      {/* <PokemonInfo /> */}
      <PokemonDetails pokemon={pokemonDetails} locations={pokemonLocations} />
    </div>
  );
}

export default App;
