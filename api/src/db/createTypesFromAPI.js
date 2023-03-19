require('dotenv').config();
const axios = require('axios');
const { API_TYPES_URL } = process.env;

const createTypesFromAPI = async () => {
    const response = await axios.get();
};

module.exports = createTypesFromAPI;