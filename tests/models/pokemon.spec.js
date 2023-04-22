const { Pokemon, conn } = require('../../src/db/db.js');
const { expect } = require('chai');

describe('Test Pokemon Model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database: ', err);
    })
  );

  const pokemon = {
    name: 'LeoPoke',
    image: 'LeoPoke.image.url',
    hp: 100,
    attack: 100,
    defense: 100,
    speed: 100,
    height: 100,
    weight: 100,
  };

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('Correct Pokemon Model', () => {
      it('Should create a new pokemon with valid values', async () => {
        const newPokemon = await Pokemon.create(pokemon);
        expect(newPokemon.id).to.exist;
        expect(newPokemon.name).to.equal('LeoPoke');
        expect(newPokemon.image).to.equal('LeoPoke.image.url');
        expect(newPokemon.hp).to.equal(100);
        expect(newPokemon.attack).to.equal(100);
        expect(newPokemon.defense).to.equal(100);
        expect(newPokemon.speed).to.equal(100);
        expect(newPokemon.height).to.equal(100);
        expect(newPokemon.weight).to.equal(100);
      });
    });
  });

  describe('Test Pokemon Name Validation', () => {
    beforeEach(async () => {
      await Pokemon.sync({ force: true });
      await Pokemon.create(pokemon);
    });
    it('Should throw a validation error when trying to create a Pokemon with a duplicated name', async () => {
      const duplicatedPokemon = { ...pokemon };
      try {
        await Pokemon.create(duplicatedPokemon);
        throw new Error('The promise should have been rejected');
      } catch (error) {
        console.log(error.message);
        expect(error.message).to.include('Validation error');
      }
    });
  });

  const invalidPokemon = {
    name: 'invalidPoke',
    // image: '',
    hp: 100,
    attack: 100,
    defense: 100,
    speed: 100,
    height: 100,
    weight: 100,
  };

  describe('Test Invalid Pokemon Creation', () => {
    it('Should throw a validation error when trying to create a Pokemon with invalid data', async () => {
      try {
        await Pokemon.create(invalidPokemon);
        throw new Error('The promise should have been rejected');
      } catch (error) {
        console.log(error.message);
        expect(error.message).to.include('notNull Violation');
      }
    });
  });
});
