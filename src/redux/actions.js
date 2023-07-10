import {
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  FILTER_BY_TYPE,
  NAME_SORT,
  ATTACK_SORT,
  CLEAR_POKEMON_DETAIL,
} from "./types";
import axios from "axios";

export const getPokemons = (offset, cb) => {
  return async function (dispatch) {
    const pokemons = (
      await axios.get(
        `https://pokemon-back-v6vx.onrender.com/pokemons?offset=${offset}&limit=200`
      )
    ).data;
    dispatch({ type: GET_POKEMONS, payload: pokemons });
    if (cb) {
      cb();
    }
  };
};
export const getPokemonDetail = (id) => {
  return async function (dispatch) {
    const pokemon = (
      await axios.get(`https://pokemon-back-v6vx.onrender.com/pokemons/${id}`)
    ).data;
    dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
  };
};
export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const pokemons = (
        await axios.get(
          `https://pokemon-back-v6vx.onrender.com/pokemons?name=${name}`
        )
      ).data;
      dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemons });
    } catch (error) {
      alert("No se ha encontrado al pokemon");
    }
  };
};
export const getTypes = () => {
  return async function (dispatch) {
    const types = (
      await axios.get(`https://pokemon-back-v6vx.onrender.com/types`)
    ).data;
    dispatch({ type: GET_TYPES, payload: types });
  };
};

export const filterByType = (type) => {
  return { type: FILTER_BY_TYPE, payload: type };
};

export const nameSort = (nameSortType) => {
  return { type: NAME_SORT, payload: nameSortType };
};
export const attackSort = (attackSortType) => {
  return { type: ATTACK_SORT, payload: attackSortType };
};

export const clearPokemonDetail = () => {
  return { type: CLEAR_POKEMON_DETAIL };
};
