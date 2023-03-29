import { ADD_POKEMON, SEARCH_POKEMON_BY_NAME, SEARCH_POKEMON_BY_ID, FILTER_AND_ORDER_POKEMONS, RESET_POKEMONS_FILTERS, GET_POKEMONS, GET_TYPES } from "../actions/types.js";

const initialState = {
    selectedPokemons: [],   // Selected pokemons to display
    allPokemons: [],        // All pokemons
    allTypeNames: [],       // All pokemons type names
};

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_POKEMON:  // Add a pokemon to allPokemons state
            return {
                ...state,
                allPokemons: [...state.allPokemons, payload],
            }
        case SEARCH_POKEMON_BY_NAME:
            const pokemon = state.allPokemons.find(p => (p.name === payload));
            return {
                ...state,
                selectedPokemons: pokemon ? [pokemon] : []
            }
        case SEARCH_POKEMON_BY_ID:
            const pokemon2 = state.allPokemons.find(p => (p.id.toString() === payload));
            return {
                ...state,
                selectedPokemons: pokemon2 ? [pokemon2] : []
            }
        // case DELETE_FAVORITE:   // Delete a character from selectedFavorites and allFavorites
        //     const newFarorites = state.selectedFavorites.filter(
        //         favChar => favChar.id !== payload);
        //     const newallFavorites = state.allFavorites.filter(
        //         favChar => favChar.id !== payload);
        //     return {
        //         ...state,
        //         selectedFavorites: newFarorites,
        //         allFavorites: newallFavorites,
        //     }
        // case ORDER:     // Order selectedFavorites ascending or descending
        //     const ordered = [...state.selectedFavorites];
        //     ordered.sort((a, b) => a.id - b.id);
        //     if (payload !== 'ASC') ordered.reverse();
        //     return {
        //         ...state,
        //         selectedFavorites: [...ordered],
        //     }
        // case FILTER:    // Filter selectedFavorites by gender
        //     const filteredByGender = state.allFavorites.filter(char => char.gender === payload);
        //     return {
        //         ...state,
        //         selectedFavorites: [...filteredByGender],
        //     }
        // case RESET_FAV_FILTERS:     // selectedFavorites <--- allFavorites
        //     return {
        //         ...state,
        //         selectedFavorites: [...state.allFavorites],
        // }
        case FILTER_AND_ORDER_POKEMONS:
            console.log('-------payload-----');
            console.log(payload);
            return {
                ...state,
            }
        case GET_POKEMONS:  // selectedPokemons <--- allFavorites <--- payload (from backend)
            return {
                ...state,
                selectedPokemons: payload,
                allPokemons: payload,
            }
        case GET_TYPES:
            const typeNames = payload.map(type => type.name);
            return {
                ...state,
                allTypeNames: typeNames,
            }

        default:
            return initialState
    }
}

export default rootReducer;