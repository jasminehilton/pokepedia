import { useReducer, useEffect } from "react"
import axios from 'axios';

// jotai - state management

export const ACTIONS = {
  SELECT_POKEMON: 'SELECT_POKEMON',
  FETCH_POKEMON_LOCATIONS: 'FETCH_POKEMON_LOCATIONS',
  FETCH_POKEMON_TYPE_INTERACTIONS: 'FETCH_POKEMON_TYPE_INTERACTIONS',
  DISPLAY_POKEMON_DATA: 'DISPLAY_POKEMON_DATA',
  CLOSE_POKEMON_DATA: 'CLOSE_POKEMON_DATA',
  FETCH_TYPES: 'FETCH_TYPES',
  FILTER_BY_TYPE: 'FILTER_BY_TYPE',
  ADD_TYPE_FILTER: 'ADD_TYPE_FILTER',
  FILTER_BY_REGION: 'FILTER_BY_REGION',
  CLEAR_TYPE_FILTER: 'CLEAR_TYPE_FILTER',
  CLEAR_REGION_FILTER: 'CLEAR_REGION_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SELECT_PAGE: 'SELECT_PAGE',
  INITIATE_SEARCH: 'INITIATE_SEARCH',
  FETCH_POKEMON_SUCCESS: 'FETCH_POKEMON_SUCCESS',
  FETCH_POKEMON_FAILURE: 'FETCH_POKEMON_FAILURE',
};

const initialState = {
  isLoading: true,
  pokemonData: [],
  filteredPokemonData: [],
  error: null,
  // pokemonDetails: {},
  next: null,
  previous: null,
  search: "",
  regionsData: [],
  typesData: [],
  filters: {
    types: [],
    regions: []
  },
  isButtonSelected: false, // useState
  isModalVisible: false, // useState
  selectPokemonData: null,
  locations: [],
  typeInteractions: {
    takeTwoTimesDamage: [],
    dealTwoTimesDamage: [],
    takeHalfDamage: [],
    dealHalfDamage: [],
    takeNoDamage: [],
    dealNoDamage: []
  },
  //isLoggedIn: true, demo purposes
  //isShiny: null,
  //isCaught: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_POKEMON:
      return { ...state, };
    case ACTIONS.FETCH_POKEMON_LOCATIONS:
      return { ...state, locations: action.payload };
    case ACTIONS.FETCH_POKEMON_TYPE_INTERACTIONS:
      return {
        ...state, typeInteractions: {
          ...state,
          typeInteractions: {
            takeTwoTimesDamage: action.payload.takeTwoTimesDamage,
            dealTwoTimesDamage: action.payload.dealTwoTimesDamage,
            takeHalfDamage: action.payload.takeHalfDamage,
            dealHalfDamage: action.payload.dealHalfDamage,
            takeNoDamage: action.payload.takeNoDamage,
            dealNoDamage: action.payload.dealNoDamage,
          }
        }
      };
    case ACTIONS.DISPLAY_POKEMON_DATA:
      return {
        ...state,
        isModalVisible: true,
        selectPokemonData: action.payload
      };
    case ACTIONS.CLOSE_POKEMON_DATA:
      return {
        ...state,
        selectPokemonData: {},
        isModalVisible: false
      };
    case ACTIONS.FETCH_TYPES:
      return { ...state, typesData: action.typesData };
    case ACTIONS.ADD_TYPE_FILTER:
      return { ...state, filters: { ...state.filters, types: action.selectedTypes } };
    case ACTIONS.FILTER_BY_TYPE:
      return { ...state, filteredPokemonData: action.payload };
    case ACTIONS.FILTER_BY_REGION:
      return { ...state, filters: { ...state.filters, regions: action.selectedRegions } };
    case ACTIONS.CLEAR_TYPE_FILTER:
      return { ...state, filters: { ...state.filters, types: action.selectedTypes } };
    case ACTIONS.CLEAR_REGION_FILTER:
      return { ...state, filters: { ...state.filters, regions: action.selectedRegions } };
    case ACTIONS.CLEAR_FILTERS:
      return { ...state, filters: { regions: [], types: [] } };
    case ACTIONS.SELECT_PAGE:
      return { ...state, };
    case ACTIONS.INITIATE_SEARCH:
      return { ...state, };
    case ACTIONS.FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemonData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        error: null
      };
    case ACTIONS.FETCH_POKEMON_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default function usePokemonData() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPokeData = (data) => {
    dispatch({ type: ACTIONS.SELECT_POKEMON, selectPokemon: data })
  };

  return {
    state,
    dispatch
  };
};

