import { ADD_POKEMON, SEARCH_POKEMON_BY_NAME, SEARCH_POKEMON_BY_ID, FILTER_AND_ORDER_POKEMONS, RESET_POKEMONS_FILTERS, GET_POKEMONS, GET_TYPES } from "./types";
import axios from 'axios';

export function addPokemon(poke) {
    return async function (dispatch) {
        try {
            // Add created pokemon to DB
            const { data } = await axios.post('http://localhost:3001/pokemons', poke);

            // Add created pokemon to store
            dispatch({
                type: ADD_POKEMON,
                payload: data,
            })
        } catch (error) {
            throw new Error({ message: error });
        }
    }
}

export function filterAndOrder(filters) {  // filters is an object with filter and order criteria
    return {
        type: FILTER_AND_ORDER_POKEMONS,
        payload: filters,
    }
}

export function searchPokemonByName(name) {
    return {
        type: SEARCH_POKEMON_BY_NAME,
        payload: name,
    }
}

export function searchPokemonById(id) {
    return {
        type: SEARCH_POKEMON_BY_ID,
        payload: id,
    }
}

export function getPokemons() {
    return async function (dispatch) {
        try {
            let pokesFromBackend = await (await axios.get(`http://localhost:3001/pokemons`)).data;

            dispatch({
                type: GET_POKEMONS,
                payload: pokesFromBackend,
            });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export function getTypes() {
    return async function (dispatch) {
        try {
            const typesFromBackend = await (await axios.get('http://localhost:3001/types')).data;

            dispatch({
                type: GET_TYPES,
                payload: typesFromBackend,
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}