const { Pokemon, Type } = require("../db/db.js");

const createPokemon = async (req, res) => {
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
};

module.exports = createPokemon;