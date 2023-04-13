import { ADD_POKEMON, SEARCH_POKEMON_BY_NAME, SEARCH_POKEMON_BY_ID, FILTER_AND_ORDER_POKEMONS, RESET_POKEMONS_FILTERS, GET_POKEMONS, GET_TYPES, SET_CURRENT_PAGE, SET_SELECTED_TYPE_FILTER, SET_SELECTED_SOURCE_FILTER, SET_SELECTED_ORDER } from "./types";
import axios from 'axios';

export function addPokemon(poke) {
    return async function (dispatch) {
        try {
            // Add created pokemon to DB
            const { data } = await axios.post('http://localhost:3001/pokemons', poke);
            poke.created = true; // Add created key and set to true to mark it as a created pokemon (not retrieved form API)
            poke.id = data.id;  // Add id generated in DB to poke (not using data to add to store because it doesn't have types)
            
            // Add created pokemon to store
            dispatch({
                type: ADD_POKEMON,
                payload: poke,
            })
        } catch (error) {
            throw new Error({ message: error });
        }
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

export function filterAndOrder(filters) {  // filters is an object with filter and order criteria
    return {
        type: FILTER_AND_ORDER_POKEMONS,
        payload: filters,
    }
}

export function resetPokemonsFilters() {
    return {
        type: RESET_POKEMONS_FILTERS,
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

export function setCurrentPage(page) {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    }
}

export function setSelectedTypeFilter(type) {
    return {
        type: SET_SELECTED_TYPE_FILTER,
        payload: type,
    }
}

export function setSelectedSourceFilter(source) {
    return {
        type: SET_SELECTED_SOURCE_FILTER,
        payload: source,
    }
}

export function setSelectedOrder(order) {
    return {
        type: SET_SELECTED_ORDER,
        payload: order,
    }
}