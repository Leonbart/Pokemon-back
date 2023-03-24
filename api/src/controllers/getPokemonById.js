const { Pokemon } = require('../db/db.js');

const getPokemonById = async(req, res) => {
    try {
        const { id } = req.params;

        // TODO: GET POKEMONS FROM API

        const pokemon = await Pokemon.findByPk(id);

        if (pokemon) return res.status(200).json(pokemon)
        else return res.status(404).send(`No pokemon found with id ${id}`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = getPokemonById;