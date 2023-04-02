// Remove unnecesary pokemon's object keys
// Input: JSON object retrieved from API (only the data field)
// Output: object with only required properties

const _stripApiPokemon = (pokeFromAPI) => {
    let types = [];
    pokeFromAPI.types.forEach(t => types.push(t.type.name));
    return ({
        id: pokeFromAPI.id,
        name: pokeFromAPI.name,
        image: pokeFromAPI.sprites.other['official-artwork']['front_default'],
        hp: pokeFromAPI.stats.find(stat => stat.stat.name === "hp").base_stat,
        attack: pokeFromAPI.stats.find(stat => stat.stat.name === "attack").base_stat,
        defense: pokeFromAPI.stats.find(stat => stat.stat.name === "defense").base_stat,
        speed: pokeFromAPI.stats.find(stat => stat.stat.name === "speed").base_stat,
        height: pokeFromAPI.height,
        weight: pokeFromAPI.weight,
        types: types,
        created: false,     // add a 'created' key and set it to false to mark that the pokemon was retrieved from API (not created)
    })
};

module.exports = { _stripApiPokemon };