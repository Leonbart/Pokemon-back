require('dotenv').config();
const { POKEMONS_COUNT } = process.env;
const { Pokemon } = require("../db/db.js");
const axios = require('axios');

const getAllPokemons = async (req, res) => {
    try {
        //      create an array of promises to get each pokemon from API
        let requestPromises = [];
        for (let i = 1; i <= POKEMONS_COUNT; i++) {
            requestPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        };
        //      get pokemons in response
        const response = await Promise.all(requestPromises);
        //      store pokemons as an array of pokemons with the needed properties
        const pokemons = response.map(response => {
            let types = [];
            response.data.types.forEach(t => types.push(t.type.name));
            return ({
                id: response.data.id,
                name: response.data.name,
                image: response.data.sprites.other['official-artwork']['front_default'],
                hp: response.data.stats.find(stat => stat.stat.name === "hp").base_stat,
                attack: response.data.stats.find(stat => stat.stat.name === "attack").base_stat,
                defense: response.data.stats.find(stat => stat.stat.name === "defense").base_stat,
                speed: response.data.stats.find(stat => stat.stat.name === "speed").base_stat,
                height: response.data.height,
                weight: response.data.weight,
                types: types
            })
        }
        );

        // console.log('-------------------------')
        // console.log('-------------------------')
        // console.log(pokemons);
        // console.log('-------------------------')
        // console.log('-------------------------')


        // Get pokemons from DB and puhs then into pokemons array
        let pokesFromDB = await Pokemon.findAll();
        pokesFromDB.forEach(p => pokemons.push(p.toJSON()));

        if (pokemons) return res.status(200).json(pokemons)
        else return res.status(404).send('No pokemons found in database');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = getAllPokemons;