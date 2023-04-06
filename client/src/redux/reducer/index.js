import { ADD_POKEMON, SEARCH_POKEMON_BY_NAME, SEARCH_POKEMON_BY_ID, FILTER_AND_ORDER_POKEMONS, RESET_POKEMONS_FILTERS, GET_POKEMONS, GET_TYPES, SET_CURRENT_PAGE } from "../actions/types.js";

const initialState = {
    selectedPokemons: [],   // Selected pokemons to display
    allPokemons: [],        // All pokemons
    allTypeNames: [],       // All pokemons type names
    currentPage: 1,         // For paginating. Must be visible to Filterning, Cards, and Paging
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
        case FILTER_AND_ORDER_POKEMONS:
            let filteredAndOrdered = [...state.allPokemons];
            // received payload:
            // {
            //     typeFilter: typeFilter,
            //     sourceFilter: sourceFilter,
            //     order: order,
            // }
            console.log('-------payload-----');
            console.log(payload);
            console.log('-------------------');
            // Filter by Type
            if (payload.typeFilter !== 'all') {
                filteredAndOrdered = state.allPokemons.filter(p => p.types.includes(payload.typeFilter));
            }
            // Filter by Source
            if (payload.sourceFilter !== 'all') {
                filteredAndOrdered = filteredAndOrdered.filter(p => p.created === (payload.sourceFilter === 'created'));
            }
            // Order
            if (payload.order !== 'none') {
                switch (payload.order) {
                    case 'name-asc':
                        filteredAndOrdered.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'name-desc':
                        filteredAndOrdered.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    case 'attack-asc':
                        filteredAndOrdered.sort((a, b) => a.attack - b.attack);
                        break;
                    case 'attack-desc':
                        filteredAndOrdered.sort((a, b) => b.attack - a.attack);
                        break;
                    default:
                }
            }
            return {
                ...state,
                selectedPokemons: [...filteredAndOrdered],
            }
        case RESET_POKEMONS_FILTERS:
            return {
                ...state,
                selectedPokemons: [...state.allPokemons],
            }
        case GET_POKEMONS:  // selectedPokemons <--- allPokemons <--- payload (from backend)
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload,
            }

        default:
            return initialState
    }
}

export default rootReducer;