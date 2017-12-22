// process.env.NODE_ENV = 'test';
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = require('chai').expect
const Account = require('../models/account')
const sampleAccount = {"balance": "1000", "name": "savings"}

chai.use(chaiHttp);

describe('Accounts', function () {
  after(function (done) {
    server.close()
    done()
  });
  before(function (done) {
    Account.collection.drop((err) => {
      if (err && err.message !== 'ns not found') console.error(err)
      done()
    })
  })
  afterEach(function (done) {
    Account.collection.drop((err) => {
      if (err && err.message !== 'ns not found') console.error(err)
      done()
    })
  });

  let id = 0
  describe('POST', function () {
    it('creates an item ', (done) => {
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            id = res.body._id
            chai.request(server)
                .get('/accounts')
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.length).to.equal(1);
                  expect(res.body[0].name).to.equal('savings');
                  expect(res.body[0].balance).to.equal(1000);
                  expect(res.body[0]._id).to.equal(id);
                  done()
                })
          });

    })
    it('discards extra parameters ', (done) => {
      sampleAccount['extra'] = 'extra params'
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            id = res.body._id
            chai.request(server)
                .get('/accounts')
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.length).to.equal(1);
                  expect(res.body[0].name).to.equal('savings');
                  expect(res.body[0].balance).to.equal(1000);
                  expect(res.body[0].extra).to.equal(undefined);
                  done()
                })
          });

    })
    it('DOES NOT create an item with wrong parameters', (done) => {
      sampleAccount['name'] = ''
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(406);
            expect(res.body.message).to.match(/name is required/i)
            done()
          });
    })


  })
})
