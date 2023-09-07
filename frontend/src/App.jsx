import "./App.css";
import TypeButtonList from "./components/TypeButtonList";

// import PokemonInfo from './components/PokemonInfo';
import PokemonList from "./components/PokemonList";
// import useCollections from './hooks/useCollections';

import RegionList from "./components/RegionList";

function App() {
  return (
    <div>
      <RegionList />
      <TypeButtonList />
      <PokemonList />
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
    </div>
  );
}

export default App;
