import "./App.css";
import { PokemonDataProvider } from "./providers/pokeProvider.js";
// import TypeButtonList from './components/TypeButtonList';

// import PokemonInfo from './components/PokemonInfo';
import PokemonList from "./components/PokemonList";
// import useCollections from './hooks/useCollections';
import usePokemonData from "./hooks/reducer";
import Regions from "./components/Regions";

function App() {
  const { onDisplayPokemonModal,
    onClosePokemonModal } = usePokemonData();
  return (
    <PokemonDataProvider>
      <PokemonList
        isOpen={onDisplayPokemonModal}
        onClose={onClosePokemonModal}
      />
      {/* <TypeButtonList /> */}
      {/* <PokemonInfo /> */}
      {/* <Regions /> */}
    </PokemonDataProvider>
  );
}

export default App;
