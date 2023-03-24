const { Pokemon } = require('../db/db.js');

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;

        // TODO: GET POKEMONS FROM API

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
};

module.exports = getPokemonByName;