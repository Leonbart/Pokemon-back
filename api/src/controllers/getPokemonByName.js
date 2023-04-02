const { Pokemon, Type } = require('../db/db.js');
const axios = require('axios');
const { _stripApiPokemon } = require('./_stripApiPokemon.js');

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;

        // First search pokemon in DB
        console.log('LOOKING IN DB');
        let poke = await Pokemon.findOne({
            where: {
                name: name
            },
            include: [
                {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            ]
        }
        );
        // the 'types' attribute comes (from eager association loading) as an array of objects. Transform it to an array of strings
        if (poke) {
            let pokemon = poke.toJSON();
            pokemon.types = poke.types.map(t => t.name);
            pokemon.created = true;     // add a 'created' key and set it to true to mark that the pokemon was retrieved from DB (where created pokemons are stored)
            return res.status(200).json(pokemon);
        }

        // If not found in DB, search pokemon in API
        console.log('LOOKING IN API');
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let pokemon = _stripApiPokemon(response.data);

        // Return result
        if (pokemon) return res.status(200).json(pokemon)
        else return res.status(404).send(`No pokemon found with name ${name}`); // Never gets here, axios throws error if not pokemon is found.
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = getPokemonByName;