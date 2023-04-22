require('dotenv').config();
const axios = require('axios');
const { API_TYPES_URL } = process.env;

const storeTypesFromAPItoDB = async (typeModel) => {
    try {
        // Get data from pokemon API
        const response = await axios.get(`${API_TYPES_URL}`);
        const typesFromAPI = response.data.results.map(elem => ({ name: elem.name }));
        
        // Now store the types in DB
        typeModel.bulkCreate(typesFromAPI)
        .then(() => {
            console.log('Types have been inserted successfully');
        })
        .catch((error) => {
            console.error('Error inserting types:', error);
        });
        
        // Finally query types from DB and return them
        return typesFromDB = await typeModel.findAll();
    } 
    catch (error) {
        return (error)
    }
};


module.exports = storeTypesFromAPItoDB;