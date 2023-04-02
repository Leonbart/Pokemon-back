const { Pokemon, Type } = require('../db/db.js');
const axios = require('axios');
const uuid = require('uuid');
const { _stripApiPokemon } = require('./_stripApiPokemon.js');

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        let pokemon;

        // If id has UUIDv1 format, search pokemon in DB
        if (uuid.validate(id) && uuid.version(id) === 1) {
            console.log('LOOKING IN DB');
            let poke = await Pokemon.findByPk(id, {
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
                pokemon = poke.toJSON();
                pokemon.types = poke.types.map(t => t.name);
                pokemon.created = true;     // add a 'created' key and set it to true to mark that the pokemon was retrieved from DB (where created pokemons are stored)
            }
        }
        // Else if id is integer, search pokemon in API (remember id comes as a string)
        else if (/^\d+$/.test(id)) {
            console.log('LOOKING IN API');
            let idToInteger = parseInt(id, 10);
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idToInteger}`);
            pokemon = _stripApiPokemon(response.data);
        }
        // Wrong id type
        else return res.status(400).send(`Wrong id type: ${id}`);

        // Return result
        if (pokemon) return res.status(200).json(pokemon)
        else return res.status(404).send(`No pokemon found with id ${id}`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = getPokemonById;