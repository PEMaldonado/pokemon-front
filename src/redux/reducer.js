import {
  ATTACK_SORT,
  CLEAR_POKEMON_DETAIL,
  FILTER_BY_TYPE,
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_DETAIL,
  GET_TYPES,
  NAME_SORT,
} from "./types";

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: [],
  filteredPokemons: [],
  filterType: "ALL",
  sortType: "",
  sortedPokemons: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return { ...state, pokemonDetail: action.payload };

    case FILTER_BY_TYPE:
      if (action.payload === "ALL")
        return { ...state, filteredPokemons: state.pokemons, sortType: "" };
      if (action.payload === "DB") {
        const BDD = state.pokemons.filter(
          (pokemon) => pokemon.created === true
        );
        return {
          ...state,
          filterType: action.payload,
          filteredPokemons: BDD,
          sortType: "",
        };
      }
      if (action.payload === "API") {
        const API = state.pokemons.filter(
          (pokemon) => pokemon.created === false
        );
        return {
          ...state,
          filterType: action.payload,
          filteredPokemons: API,
          sortType: "",
        };
      }

      const filteredPokemons = state.pokemons.filter((pokemon) =>
        pokemon.type
          ? pokemon.type.includes(action.payload.toLowerCase())
          : pokemon.types.length === 2
          ? pokemon.types[0].name.includes(action.payload.toLowerCase()) ||
            pokemon.types[1].name.includes(action.payload.toLowerCase())
          : pokemon.types[0].name.includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filterType: action.payload,
        filteredPokemons: filteredPokemons,
        sortType: "",
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        filteredPokemons: Array.isArray(action.payload)
          ? action.payload
          : [action.payload],
        sortType: "",
      };
    case GET_TYPES:
      return { ...state, types: action.payload };

    case NAME_SORT:
      const nameSortedPokemons = [...state.filteredPokemons].sort((a, b) => {
        if (action.payload === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      return { ...state, sortType: "name", sortedPokemons: nameSortedPokemons };
    case ATTACK_SORT:
      const attackSortedPokemons = [...state.filteredPokemons].sort((a, b) => {
        if (action.payload === "asc") {
          return a.attack - b.attack;
        } else {
          return b.attack - a.attack;
        }
      });

      return {
        ...state,
        sortType: "attack",
        sortedPokemons: attackSortedPokemons,
      };

    case CLEAR_POKEMON_DETAIL:
      return { ...state, pokemonDetail: {} };

    default:
      return { ...state };
  }
};

export default rootReducer;
