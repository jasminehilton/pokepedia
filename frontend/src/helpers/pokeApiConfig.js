// pokeApiConfig.js
import Pokedex from 'pokedex-promise-v2';

const options = {
  protocol: 'https',         // Use HTTPS protocol (default)
  hostName: 'pokeapi.co',    // PokeAPI host (default)
  versionPath: '/api/v2/',   // API version path (default)
  cacheLimit: 100 * 1000,    // Cache limit in milliseconds (100s)
  timeout: 5 * 1000,         // Request timeout in milliseconds (5s)
};

const P = new Pokedex(options);

export default P;
