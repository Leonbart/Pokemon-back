const { Router } = require("express");
const { Pokemon } = require("../db/db.js");
const pokemonRouter = Router();


// Get pokemon by id from database
// (using req params - GET | /pokemons/:idPokemon)
pokemonRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findbyPk(id);

        if (pokemon) return res.status(200).json(pokemon)
        else return res.status(404).send(`No pokemon found with id ${id}`);
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get pokemon by name from database
// (using req queries - GET | /pokemons/name?="...")
pokemonRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const pokemon = await Pokemon.findOne({
            where: {
                name
            }
        });

        if (pokemon) return res.status(200).json(pokemon)
        else return res.status(404).send(`No pokemon found with name ${name}`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all pokemons from database
pokemonRouter.get('/', async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();

    if (pokemons) return res.status(200).json(pokemons)
    else return res.status(404).send('No pokemons found in database');
  }
  catch (error) {
    res.status(400).json({ message: error.message });
}
});


// Create new pokemon in database
pokemonRouter.post('/', async (req, res) => {
    try {
        // Validate if mandatory fields exist
        const { name, image, hp, attack, defense, types } = req.body;
        if (!name || !image || !hp || !attack || !defense || !types)
        return res.status(400).send('Mandatory fields missing');

        const createdPokemon = await Pokemon.create(req.body);
        return res.status(201).json(createdPokemon);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = pokemonRouter;
