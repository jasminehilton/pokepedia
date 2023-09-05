import "./App.css";
import { PokemonDataProvider } from "./providers/pokeProvider.js";
import TypeButtonList from './components/TypeButtonList';

// import PokemonInfo from './components/PokemonInfo';
import PokemonList from "./components/PokemonList";
// import useCollections from './hooks/useCollections';

// import RegionList from "./components/RegionList";

function App() {
  // const collection = useCollections();
  // console.log(collection);
  return (
    <PokemonDataProvider>
      {/* <RegionList /> */}
      <TypeButtonList />
      <PokemonList />
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
    </PokemonDataProvider>
  );
}

export default App;
