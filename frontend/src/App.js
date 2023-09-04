import './App.css';
import TypeButtonList from './components/TypeButtonList';

// import PokemonInfo from './components/PokemonInfo';
import PokemonList from './components/PokemonList

// import useCollections from './hooks/useCollections';

import Regions from './components/Regions';

function App() {
  // const collection = useCollections();
  // console.log(collection);
  return (
    <div className="App">
      <TypeButtonList />
      <PokemonList />
      {/* <PokemonInfo /> */}
      {/* You can remove the PokemonInfo Jackie */}
       <Regions />
    </div>
  );
}

export default App;