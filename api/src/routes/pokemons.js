const { Router } = require("express");

const pokemonRouter = Router();

// Controllers
const getAllPokemons = require('../controllers/getAllPokemons.js');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemonByName = require('../controllers/getPokemonByName');
const createPokemon = require('../controllers/createPokemon');

// Get pokemon by name from API and database
// (using req queries - GET | /pokemons/name?name="...")
pokemonRouter.get('/name', getPokemonByName);

// Get pokemon by id from API and database
// (using req params - GET | /pokemons/:idPokemon)
pokemonRouter.get('/:id', getPokemonById);

// Get all pokemons from API and database
// (using req query ?source)
pokemonRouter.get('/', getAllPokemons);


// Create new pokemon in database (and its types)
pokemonRouter.post('/', createPokemon);



module.exports = pokemonRouter;