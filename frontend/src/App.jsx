import "./App.css";
import { PokemonDataProvider } from "./providers/pokeProvider.js";
// import TypeButtonList from './components/TypeButtonList';

// import PokemonInfo from './components/PokemonInfo';
import PokemonList from "./components/PokemonList";
// import useCollections from './hooks/useCollections';

import Regions from "./components/Regions";

function App() {
  // const collection = useCollections();
  // console.log(collection);
  return (
    <PokemonDataProvider>
      <PokemonList />
      {/* <TypeButtonList /> */}
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
    </PokemonDataProvider>
  );
}

export default App;
