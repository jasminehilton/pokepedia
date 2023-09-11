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
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  FETCH_POKEMON_COLLECTION: "FETCH_POKEMON_COLLECTION",
  SET_CAUGHT_NORMAL: "SET_CAUGHT_NORMAL",
  SET_CAUGHT_SHINY: "SET_CAUGHT_SHINY",
  SET_IS_NEW: "SET_IS_NEW",
  SET_MY_COLLECTION_SELECTED: "SET_MY_COLLECTION_SELECTED"
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
  search: "",
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
      return { ...state };
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
      const updatedCollectionNormal = state.collectionPokemon.map((pokemon) => {
        if (pokemon.id === action.payload.pokemonId) {
          return { ...pokemon, caught_normal: action.payload.isCaught };
        }
        return pokemon;
      });

      // Send a POST request to update the backend with the new caught_normal value
      // You need to implement the backend update logic here

      return { ...state, collectionPokemon: updatedCollectionNormal };

    case ACTIONS.SET_CAUGHT_SHINY:
      // payload: { userId, pokemonId, caught_normal, caught_shiny }
      const pokemonId = action.payload.pokemon_id;
      const collection_id = action.payload.collection_id;
      const isAlreadyInList = state.collectionPokemon.some(
        (pokemon) => pokemon.pokemon_id === pokemonId
      );

      let updatedCollectionShiny;

      if (isAlreadyInList) {
        // If the Pokémon is already in the list, update the 'caught_shiny' property
        updatedCollectionShiny = state.collectionPokemon.map((pokemon) => {
          if (pokemon.id === action.payload.pokemonId) {
            return { ...pokemon, caught_shiny: true };
          }
          return pokemon;
        });

        const data = {
          caught_normal: null,
          caught_shiney: true,
        };

        axios.post(`/update/${collection_id}`, data).then((res) => {
          console.log("Successful update");
        });

        return { ...state, collectionPokemon: updatedCollectionShiny };
      } else {
        const data = {
          collectionObj: {
            caught_normal: false,
            caught_shiney: true,
          },
          pokemon_id: pokemonId,
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
      return { ...state, isNew: action.payload }
    case ACTIONS.SET_MY_COLLECTION_SELECTED:
      return { ...state, myCollectionSelected: action.payload }
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
