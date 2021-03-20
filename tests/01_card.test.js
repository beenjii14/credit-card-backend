const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../src');
const faker = require('faker');

const api = supertest(app);

const dataSend = {
  cardNumber: faker.finance.creditCardNumber(),
  cardName: faker.name.findName(),
  cvv: faker.finance.creditCardCVV(),
  expiration: '12/22'
};
let idCard = null;

describe('Testing for credit card', () => {
  afterAll(() => {
    server.close();
    mongoose.connection.close();
  });

  test('should create new card', done => {
    api.post('/api/v1/card')
      .expect(201)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .send(dataSend)
      .end((error, response) => {
        idCard = response.body.data._id;
        done();
      });
  });

  test('should get card', done => {
    api.get(`/api/v1/card/${idCard}`)
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end(() => {
        done();
      });
  });

  test('should delete card', done => {
    api.delete(`/api/v1/card/${idCard}`)
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end(() => {
        done();
      });
  });
  
});
