import './App.css';
// import TypeButtonList from './components/TypeButtonList';

// import PokemonInfo from './components/PokemonInfo';
import PokemonList from './components/PokemonList';
// import useCollections from './hooks/useCollections';

import Regions from './components/Regions';

function App() {
  // const collection = useCollections();
  // console.log(collection);
  return (
    <div className="App">
      <PokemonList />
      {/* <TypeButtonList /> */}
      {/* <PokemonInfo /> */}
       {/* <Regions /> */}
    </div>
  );
}

export default App;