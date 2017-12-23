process.env.NODE_ENV = 'test';
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = require('chai').expect
const Account = require('../models/account')
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
  describe('POST/GET', function () {
    it('creates an item ', (done) => {
      const sampleAccount = {"balance": "1000", "name": "savings"}
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
      const sampleAccount = {"balance": "1000", "name": "savings", extra: 'extra params'}
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
      const sampleAccount = {"balance": "1000", "name": ""}
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(406);
            expect(res.body.message).to.match(/name is required/i, 'failed name')
          });
      sampleAccount['name'] = 'test'
      sampleAccount['balance'] = 'test'
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(406);
            expect(res.body.message).to.match(/Cast to Number failed/i, 'failed balance')
            done()
          })
    })
  })
  describe('UPDATE', function () {
    it('UPDATE an already created item', (done) => {
      const sampleAccount = {"balance": "1000", "name": "savings"}
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            id = res.body._id
            sampleAccount['balance'] = '-999'
            chai.request(server)
                .put(`/accounts/${id}`)
                .send(sampleAccount)
                .end((err, res) => {
                  expect(res.body.balance).to.equal(-999);
                  expect(res.status).to.equal(200);
                  done();
                })
          })
    })
    it('DOES NOT update an item with wrong parameters', (done) => {
      const sampleAccount = {"balance": "1000", "name": "savings"}
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            id = res.body._id
            sampleAccount['balance'] = 'test'
            chai.request(server)
                .put(`/accounts/${id}`)
                .send(sampleAccount)
                .end((err, res) => {
                  expect(res.status).to.equal(406);
                  expect(res.body.message).to.match(/Cast to Number failed/i, 'failed balance')
                  done()
                })
          })
    })
  })
  describe('READ', function () {
    it('returns an empty array when there are no accounts', (done) => {
      chai.request(server)
          .get(`/accounts`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(0);
            done()
          })
    })
    it('returns a specific item', (done) => {
      const sampleAccount = {"balance": "1001", "name": "savings"}
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            id = res.body._id
            sampleAccount['balance'] = 'test'
            chai.request(server)
                .get(`/accounts?accountId=${id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.balance).to.equal(1001);
                  done()
                })
          })

    })
  })
  describe('REMOVE', function () {
    it('deletes an item', (done) => {
      const sampleAccount = {"balance": "1000", "name": "savings"}
      chai.request(server)
          .post('/accounts')
          .send(sampleAccount)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            id = res.body._id
            sampleAccount['balance'] = '-999'
            chai.request(server)
                .delete(`/accounts/${id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(204);
                  chai.request(server)
                      .get(`/accounts?accountId=${id}`)
                      .end((err, res) => {
                        expect(res.status).to.equal(404);
                        done()
                      })

                })
          })

    })
  })

})
