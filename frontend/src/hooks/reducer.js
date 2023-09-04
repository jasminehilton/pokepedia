import { useReducer, useState, useEffect } from "react"
import axios from 'axios';

export const ACTIONS = {
  SELECT_POKEMON: 'SELECT_POKEMON',
  FETCH_POKEMON_LOCATIONS: 'FETCH_POKEMON_LOCATIONS',
  FETCH_POKEMON_TYPE_INTERACTIONS: 'FETCH_POKEMON_TYPE_INTERACTIONS',
  DISPLAY_POKEMON_DATA: 'DISPLAY_POKEMON_DATA',
  CLOSE_POKEMON_DATA: 'CLOSE_POKEMON_DATA',
  FETCH_TYPES: 'FETCH_TYPES',
  FILTER_BY_TYPE: 'FILTER_BY_TYPE',
  FILTER_BY_REGION: 'FILTER_BY_REGION',
  CLEAR_TYPE_FILTER: 'CLEAR_TYPE_FILTER',
  CLEAR_REGION_FILTER: 'CLEAR_REGION_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SELECT_PAGE: 'SELECT_PAGE',
  INITIATE_SEARCH: 'INITIATE_SEARCH',
  FETCH_POKEMON_SUCCESS: 'FETCH_POKEMON_SUCCESS',
  FETCH_POKEMON_FAILURE: 'FETCH_POKEMON_FAILURE',
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
      return { ...state, isModalVisible: true };
    case ACTIONS.CLOSE_POKEMON_DATA:
      return { ...state, isModalVisible: false };
    case ACTIONS.FETCH_TYPES:
      return { ...state, typesdata: action.typesData };
    case ACTIONS.FILTER_BY_TYPE:
      return { ...state, filters: { ...state.filters, types: action.selectedTypes } };
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

const initialState = {
  isLoading: true,
  pokemonData: [],
  error: null,
  // pokemonDetails: {},
  next: null,
  previous: null,
};

export default function usePokemonData() {
  const initialState = {
    isLoading: true,
    pokemonData: [],
    error: null,
    // pokemonDetails: {},
    next: null,
    previous: null,
    pokemonList: [],
    isModalVisiable: false,
    isButtonSelected: false,
    selectPokemonData: {},
    search: "",
    typesData: [],
    filters: {
      types: [],
      regions: []
    },
    locations: [],
    typeInteractions: {
      takeTwoTimesDamage: [],
      dealTwoTimesDamage: [],
      takeHalfDamage: [],
      dealHalfDamage: [],
      takeNoDamage: [],
      dealNoDamage: []
    }
    //isLoggedIn: true, demo purposes
    //isShiny: null,
    //isCaught: [],
  };


  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('Selected types:', state.filters.types);
  }, [state.filters.types]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then((response) => {
        dispatch({ type: ACTIONS.FETCH_TYPES, typesData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching Pokémon types data:', error);
      });
  }, []);

  const fetchPokeData = (data) => {
    dispatch({ type: ACTIONS.SELECT_POKEMON, selectPokemon: data })
  };

  const onDisplayPokemonModal = () => {
    dispatch({ type: ACTIONS.DISPLAY_POKEMON_DATA });
  };

  const onClosePokemonModal = () => {
    dispatch({ type: ACTIONS.CLOSE_POKEMON_DATA });
  };

  const setSelectedTypes = (typeName) => {
    const selectedTypes = state.filters.types;
    if (selectedTypes.includes(typeName)) {
      const selected = selectedTypes.filter((type) => type !== typeName);
      dispatch({ type: ACTIONS.CLEAR_TYPE_FILTER, selectedTypes: selected });
    } else {
      const selected = [...selectedTypes, typeName];
      dispatch({ type: ACTIONS.FILTER_BY_TYPE, selectedTypes: selected });
    };
  };

  return {
    state,
    initialState,
    // fetchPokemonData,
    setSelectedTypes,
    onDisplayPokemonModal,
    onClosePokemonModal
  };
};

export { reducer, initialState };