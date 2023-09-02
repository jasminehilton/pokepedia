import './App.css';
import useCollections from './hooks/useCollections';

function App() {
  const collection = useCollections();
  console.log(collection);
  return (
    <div className="App">
    </div>
  );
}

export default App;
