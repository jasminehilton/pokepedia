import './App.css';
import TypeButtonList from './components/TypeButtonList';

import PokemonInfo from './components/PokemonInfo';

// import useCollections from './hooks/useCollections';


function App() {
  // const collection = useCollections();
  // console.log(collection);
  return (
    <div className="App">
      <TypeButtonList />
      <PokemonInfo />
    </div>
  );
}

export default App;
