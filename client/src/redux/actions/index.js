import { ADD_POKEMON, SEARCH_POKEMON_BY_NAME, SEARCH_POKEMON_BY_ID, ADD_POKEMONS, FILTER, ORDER, RESET_FILTERS, GET_POKEMONS } from "./types";
import axios from 'axios';

export function addPokemon(poke) {
    return async function (dispatch) {
        try {
            // If a created pokemon, send it to DB
            const { data } = await axios.post('http://localhost:3001/pokemons', poke);

            dispatch({
                type: ADD_POKEMON,
                payload: data,
            })
        } catch (error) {
            throw new Error({ message: error });
        }
    }
}

// export function filterCards(gender) {
//     return {
//         type: FILTER,
//         payload: gender,
//     }
// }
// export function orderCards(order) { // order --> 'ASC' or 'DESC'
//     return {
//         type: ORDER,
//         payload: order,
//     }
// }

// export function resetFavFilters() {
//     return {
//         type: RESET_FAV_FILTERS,
//         // payload: '',
//     }
// }


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
            let PokesFromBackend = await (await axios.get(`http://localhost:3001/pokemons`)).data;

            dispatch({
                type: GET_POKEMONS,
                payload: PokesFromBackend,
            });
        } catch (error) {
            throw new Error(error);
        }
    };
}