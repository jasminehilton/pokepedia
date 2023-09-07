import PokemonList from "../components/PokemonList";
import PokemonFooter from "../components/PokemonFooter";
import PokemonLogo from "../components/PokemonLogo";

const HomeRoute = () => {

  return (
    <div>
      <PokemonLogo />
      <PokemonList />
      <PokemonFooter />
    </div>
  );
};

export default HomeRoute;