const { Router } = require("express");
const { Pokemon, Type } = require("../db/db.js");
const pokemonRouter = Router();

// Get pokemon by name from database
// (using req queries - GET | /pokemons/name?name="...")
pokemonRouter.get('/name', async (req, res) => {
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

// Get pokemon by id from database
// (using req params - GET | /pokemons/:idPokemon)
pokemonRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findByPk(id);
        
        if (pokemon) return res.status(200).json(pokemon)
        else return res.status(404).send(`No pokemon found with id ${id}`);
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
        // Validate if types is an array of strings (type names) with at least one element.
        if (!Array.isArray(types)) return res.status(400).send('types must be an array');
        if (types.length < 1) return res.status(400).send('types array must have at least one element');
        
        // Create pokemon
        const createdPokemon = await Pokemon.create(req.body);

        // Get the types indicated in 'types' input parameter, from DB
        const typesToInsert = [];
        for (let i = 0; i < types.length; i++) {
            typesToInsert.push(await Type.findOne({
                where: {
                    name: types[i]
                }
            }));
        };
        
        //Create pokemon-types associations (in juction table)
        await createdPokemon.addTypes(typesToInsert);


        return res.status(201).json(createdPokemon);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = pokemonRouter;
