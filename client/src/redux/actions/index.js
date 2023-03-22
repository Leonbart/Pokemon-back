import { ADD_POKEMON, ADD_POKEMONS, FILTER, ORDER, RESET_FILTERS, GET_POKEMONS } from "./types";
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


export function deleteFavorite(id) {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/rickandmorty/fav/${id}`);
            dispatch({
                type: DELETE_FAVORITE,
                payload: id,
            });
        } catch (error) {
            // By design when a card is closed, it is removed from favorites without checking if it was a favorite. So console.log but don't throw an error.
            console.log(error);
            // throw new Error(error);
        }
    };
}

//     return {
//         type: DELETE_FAVORITE,
//         payload: id
//     }
// }

export function deleteFavorites() {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/rickandmorty/fav/`);
            dispatch({
                type: DELETE_FAVORITES,
                // payload: id,
            });
        } catch (error) {
            throw new Error(error);
        }
    };
}


export function filterCards(gender) {
    return {
        type: FILTER,
        payload: gender,
    }
}
export function orderCards(order) { // order --> 'ASC' or 'DESC'
    return {
        type: ORDER,
        payload: order,
    }
}
export function resetFavFilters() {
    return {
        type: RESET_FAV_FILTERS,
        // payload: '',
    }
}

export function getFavorites() {
    return async function (dispatch) {
        try {
            let favsFromBackEnd = await (await axios.get(`http://localhost:3001/rickandmorty/fav`)).data;

            dispatch({
                type: GET_FAVORITES,
                payload: favsFromBackEnd,
            });
        } catch (error) {
            throw new Error(error);
        }
    };
}