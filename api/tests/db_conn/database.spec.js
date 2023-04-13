const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Type, Pokemon, conn } = require('../../src/db/db.js');

const agent = session(app);
const pokemon = {
  name: 'leo-pokemon',
  hp: 10,
  attack: 20,
  defense: 30,
  image: 'an-image-url',
  speed: 40,
  height: 50,
  weight: 60,
};

describe('Test DB Connection', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database: ', err);
    })
  );
  beforeEach(() => Pokemon.sync({ force: true }));

  it('Should connect to the pokemon database', () => {
    expect(conn).to.be.an('object');
    expect(conn.config.database).to.equal('pokemon');
  });
});

describe('Test Pokemon Creation', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database: ', err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  it('Should be able to create a pokemon', async () => {
    const createdPokemon = await Pokemon.findOne({
      where: { name: 'leo-pokemon' },
    });
    expect(createdPokemon).to.be.an('object');
    expect(createdPokemon.name).to.equal('leo-pokemon');
    expect(createdPokemon.speed).to.equal(40);
  });
});

const newType = {
  name: 'Henry-Type',
};
describe('Test Type Creation', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database: ', err);
    })
  );
  beforeEach(() => Type.sync({ force: true }).then(() => Type.create(newType)));

  it('Should be able to create a new Type', async () => {
    const createdType = await Type.findOne({
      where: { name: 'Henry-Type' },
    });
    expect(createdType).to.be.an('object');
    expect(createdType.name).to.equal('Henry-Type');
  });
});
