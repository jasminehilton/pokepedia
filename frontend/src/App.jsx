import "./App.css";
import { PokemonDataProvider, usePokemonDataContext, usePokemonDataDispatchContext } from "./providers/pokeProvider.js";
import HomeRoute from "./routes/HomeRoute";

import PokemonModal from "./routes/PokemonModal";

function App() {
  const state = usePokemonDataContext();


  return (
    <div>
      <HomeRoute />
      {/* {state.isModalVisible && <PokemonModal />} */}
    </div>
  );
}

export default App;
