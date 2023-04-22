const { Router } = require("express");
const { Type } = require("../db/db.js");
const typeRouter = Router();

// Get all pokemon types from database
typeRouter.get('/', async (req, res) => {
    try {
        const types = await Type.findAll();

        if (types) return res.status(200).json(types)
        else return res.status(404).send('No types found in database');
    } 
    catch (error) {
        res.status(400).json({ message: error.message });   
    }
});

// Create a pokemon type in database
typeRouter.post('/', async (req, res) => {
    try {
        // Validate that a name is provided
        const { name } = req.body;
        if (!name) return res.status(400).send("Type's name must be provided");        
        
        const newType = await Type.create({ name });
        return res.status(200).json(newType);
    }
    catch (error) {
        res.status(400).json({ message: error.message });   
    }
});

module.exports = typeRouter;