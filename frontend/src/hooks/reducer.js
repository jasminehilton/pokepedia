import { useReducer } from "react";


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
};

const initialState = {
  isLoading: true,
  pokemonData: [],
  filteredPokemonData: [],
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
  isButtonSelected: false, // useState
  isModalVisible: false, // useState
  isSearchBarVisible: false,
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
  //isLoggedIn: true, demo purposes
  //isShiny: null,
  //isCaught: [],
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
        pokemonByRegion: action.payload
      }
    default:
      return state;
  }
};

export default function usePokemonData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPokeData = (data) => {
    dispatch({ type: ACTIONS.SELECT_POKEMON, selectPokemon: data });
  };

  return {
    state,
    dispatch,
  };
}
