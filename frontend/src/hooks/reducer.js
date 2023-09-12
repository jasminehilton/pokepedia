import { useReducer } from "react";
import axios from "axios";

// jotai - state management

export const ACTIONS = {
  SELECT_POKEMON: "SELECT_POKEMON",
  FETCH_POKEMON_LOCATIONS: "FETCH_POKEMON_LOCATIONS",
  FETCH_POKEMON_TYPE_INTERACTIONS: "FETCH_POKEMON_TYPE_INTERACTIONS",
  DISPLAY_POKEMON_DATA: "DISPLAY_POKEMON_DATA",
  CLOSE_POKEMON_DATA: "CLOSE_POKEMON_DATA",
  FETCH_TYPES: "FETCH_TYPES",
  FETCH_REGIONS: "FETCH_REGIONS",
  FILTER_BY_TYPE: "FILTER_BY_TYPE",
  ADD_TYPE_FILTER: "ADD_TYPE_FILTER",
  ADD_REGION_FILTER: "ADD_REGION_FILTER",
  FILTER_BY_REGION: "FILTER_BY_REGION",
  CLEAR_TYPE_FILTER: "CLEAR_TYPE_FILTER",
  CLEAR_REGION_FILTER: "CLEAR_REGION_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  SELECT_PAGE: "SELECT_PAGE",
  INITIATE_SEARCH: "INITIATE_SEARCH",
  FETCH_POKEMON_SUCCESS: "FETCH_POKEMON_SUCCESS",
  FETCH_POKEMON_FAILURE: "FETCH_POKEMON_FAILURE",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_DISPLAYED_POKEMON: "SET_DISPLAYED_POKEMON",
  SET_POKEMON_BY_REGION: "SET_POKEMON_BY_REGION",
  DISPLAY_POKEMON_SEARCH: "DISPLAY_POKEMON_SEARCH",
  CLOSE_POKEMON_SEARCH: "CLOSE_POKEMON_SEARCH",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  FETCH_POKEMON_COLLECTION: "FETCH_POKEMON_COLLECTION",
  SET_CAUGHT_NORMAL: "SET_CAUGHT_NORMAL",
  SET_CAUGHT_SHINY: "SET_CAUGHT_SHINY",
  SET_IS_NEW: "SET_IS_NEW",
  SET_MY_COLLECTION_SELECTED: "SET_MY_COLLECTION_SELECTED",
  REMOVE_CAUGHT_SHINY: "REMOVE_CAUGHT_SHINY",
  REMOVE_CAUGHT_NORMAL: "REMOVE_CAUGHT_NORMAL",
};

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  pokemonData: [],
  filteredPokemonData: [],
  collectionPokemon: [],
  isNew: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 30,
  displayedPokemon: [],
  next: null,
  previous: null,
  searchWords: [],
  pokemonByRegion: [],
  regionsData: [],
  typesData: [],
  filters: {
    types: [],
    regions: {},
  },

  isButtonSelected: false,
  isModalVisible: false,
  selectPokemonData: null,
  locations: [],
  typeInteractions: {
    takeTwoTimesDamage: [],
    dealTwoTimesDamage: [],
    takeHalfDamage: [],
    dealHalfDamage: [],
    takeNoDamage: [],
    dealNoDamage: [],
  },
  myCollectionSelected: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_POKEMON:
      return { ...state };
    case ACTIONS.FETCH_POKEMON_LOCATIONS:
      return { ...state, locations: action.payload };
    case ACTIONS.FETCH_POKEMON_TYPE_INTERACTIONS:
      return {
        ...state,
        typeInteractions: {
          ...state,
          typeInteractions: {
            takeTwoTimesDamage: action.payload.takeTwoTimesDamage,
            dealTwoTimesDamage: action.payload.dealTwoTimesDamage,
            takeHalfDamage: action.payload.takeHalfDamage,
            dealHalfDamage: action.payload.dealHalfDamage,
            takeNoDamage: action.payload.takeNoDamage,
            dealNoDamage: action.payload.dealNoDamage,
          },
        },
      };
    case ACTIONS.DISPLAY_POKEMON_DATA:
      return {
        ...state,
        isModalVisible: true,
        selectPokemonData: action.payload,
      };
    case ACTIONS.CLOSE_POKEMON_DATA:
      return {
        ...state,
        selectPokemonData: {},
        isModalVisible: false,
      };
    case ACTIONS.DISPLAY_POKEMON_SEARCH:
      return {
        ...state,
        isSearchBarVisible: true,
      };
    case ACTIONS.CLOSE_POKEMON_SEARCH:
      return {
        ...state,
        isSearchBarVisible: false,
      };
    case ACTIONS.FETCH_TYPES:
      return { ...state, typesData: action.typesData };
    case ACTIONS.FETCH_REGIONS:
      return { ...state, regionsData: action.payload };
    case ACTIONS.ADD_TYPE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, types: action.selectedTypes },
      };
    case ACTIONS.ADD_REGION_FILTER:
      return {
        ...state,
        filters: { ...state.filters, regions: action.payload },
      };
    case ACTIONS.FILTER_BY_TYPE:
      return { ...state, filteredPokemonData: action.payload };
    case ACTIONS.FILTER_BY_REGION:
      return {
        ...state,
        filteredPokemonData: action.payload,
      };
    case ACTIONS.CLEAR_TYPE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, types: action.selectedTypes },
      };
    case ACTIONS.CLEAR_REGION_FILTER:
      return {
        ...state,
        filters: { ...state.filters, regions: action.selectedRegions },
      };
    case ACTIONS.CLEAR_FILTERS:
      return { ...state, filters: { regions: [], types: [] } };
    case ACTIONS.SELECT_PAGE:
      return { ...state };
    case ACTIONS.INITIATE_SEARCH:
      return { 
        ...state,
        searchWords: action.searchWords,};
    case ACTIONS.FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemonData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        error: null,
      };
    case ACTIONS.FETCH_POKEMON_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ACTIONS.SET_DISPLAYED_POKEMON:
      return {
        ...state,
        displayedPokemon: action.payload,
      };
    case ACTIONS.SET_POKEMON_BY_REGION:
      return {
        ...state,
        pokemonByRegion: action.payload,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ACTIONS.SET_CAUGHT_NORMAL:
      // payload: { pokemon_id: , collection: id }
      const pokemonIdN = action.payload.pokemon_id;
      let collection_idN = action.payload.collection_id;

      let updatedCollectionNormal;

      if (collection_idN) {
        // If the Pokémon is already in the list, update the 'caught_shiny' property
        updatedCollectionNormal = state.collectionPokemon.map((pokemon) => {
          if (pokemon.id === pokemonIdN) {
            return { ...pokemon, caught_normal: true };
          }
          return pokemon;
        });

        const data = {
          caught_normal: true,
          caught_shiny: null,
        };

        console.log(data, collection_idN, "beans", pokemonIdN);
        axios
          .post(
            `http://localhost:8080/collection/update/${collection_idN}`,
            data
          )
          .then((res) => {
            console.log("Successful update");
          })
          .catch((error) => {
            console.error("Beans:", error);
          });

        return { ...state, collectionPokemon: updatedCollectionNormal };
      } else {
        const data = {
          collectionObj: {
            caught_normal: true,
            caught_shiny: false,
          },
          pokemon_id: pokemonIdN,
        };

        axios
          .post(`http://localhost:8080/collection/1/create`, data)
          .then((res) => {
            console.log("Successful creation");
          });

        return { ...state, isNew: true };
      }

    case ACTIONS.SET_CAUGHT_SHINY:
      // payload: { pokemon_id: , collection: id }
      let collection_id = action.payload.collection_id;

      let updatedCollectionShiny;

      if (collection_id) {
        // If the Pokémon is already in the list, update the 'caught_shiny' property
        updatedCollectionShiny = state.collectionPokemon.map((pokemon) => {
          if (pokemon.pokemon_id === action.payload.pokemonId) {
            return { ...pokemon, caught_shiny: true };
          }
          return pokemon;
        });

        const data = {
          caught_normal: null,
          caught_shiny: true,
        };

        axios
          .post(
            `http://localhost:8080/collection/update/${collection_id}`,
            data
          )
          .then((res) => {
            console.log("Successful update");
          });

        return { ...state, collectionPokemon: updatedCollectionShiny };
      } else {
        const data = {
          collectionObj: {
            caught_normal: false,
            caught_shiny: true,
          },
          pokemon_id: action.payload.pokemonId,
        };

        axios
          .post(`http://localhost:8080/collection/1/create`, data)
          .then((res) => {
            console.log("Successful creation");
          });

        return { ...state, isNew: true };
      }
    case ACTIONS.FETCH_POKEMON_COLLECTION:
      return { ...state, collectionPokemon: action.payload };
    case ACTIONS.SET_IS_NEW:
      return { ...state, isNew: action.payload };
    case ACTIONS.SET_MY_COLLECTION_SELECTED:
      return { ...state, myCollectionSelected: action.payload };
    case ACTIONS.REMOVE_CAUGHT_NORMAL:
      let deleteN = false;
      let updatedCollectionNormalRN = [];
      updatedCollectionNormalRN = state.collectionPokemon.map((pokemon) => {
        if (pokemon.pokemon_id === action.payload.pokemonId) {
          if (pokemon.caught_shiny === false) {
            deleteN = true;
            return null;
          } else {
            return { ...pokemon, caught_normal: false };
          }
        }
        return pokemon;
      });

      if (deleteN) {
        axios
          .post(
            `http://localhost:8080/collection/delete/${action.payload.collection_id}`
          )
          .then(console.log("Successfully Deleted."));
      } else {
        const dataOBJ = {
          caught_normal: false,
          caught_shiny: null,
        };
        axios

          .post(
            `http://localhost:8080/collection/update/${action.payload.collection_id}`,
            dataOBJ
          )
          .then(console.log("Updated successfully"));
      }

      return {
        ...state,
        collectionPokemon: updatedCollectionNormalRN,
      };
    case ACTIONS.REMOVE_CAUGHT_SHINY:
      let deleteS = false;
      let updatedCollectionShinyRS = [];
      updatedCollectionShinyRS = state.collectionPokemon.map((pokemon) => {
        if (pokemon.pokemon_id === action.payload.pokemonId) {
          if (pokemon.caught_normal === false) {
            deleteS = true;
            return null;
          } else {
            return { ...pokemon, caught_shiny: false };
          }
        }
        return pokemon;
      });

      const filteredCollectionShinyRS = updatedCollectionShinyRS.filter(
        (pokemon) => pokemon !== null
      );

      if (deleteS) {
        axios
          .post(
            `http://localhost:8080/collection/delete/${action.payload.collection_id}`
          )
          .then((res) => {
            console.log("Successful Deletion");
          });
      } else {
        const dataOBJS = {
          caught_normal: null,
          caught_shiny: false,
        };
        axios

          .post(
            `http://localhost:8080/collection/update/${action.payload.collection_id}`,
            dataOBJS
          )
          .then(console.log("Updated beans"));
      }

      return {
        ...state,
        collectionPokemon: filteredCollectionShinyRS,
      };
    default:
      return state;
  }
};

export default function usePokemonData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
