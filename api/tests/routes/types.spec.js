const app = require('../../src/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET /types', () => {
  xit('Should return an array of 20 types', (done) => {
    chai
      .request(app)
      .get('/types')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.an('array').that.has.lengthOf(20);
        done();
      });
  });
});
