const async = require('async');
const get = require('lodash.get');
const uuid = require('uuid');
const Card = require('../models/creditCard');
const { messages } = require('../messages');

const createCard = (req, res) => {
  const { cardNumber, cardName, cvv, expiration } = req.body;
  async.auto({
    validateFields: cb => {
      if (cardNumber && (cardNumber !== '') && cardName && (cardName !== '') && cvv && (cvv !== '') && expiration && (expiration !== '')) {
        cb();
      } else {
        cb({ error: true, message: messages.es.required });
      }
    },
    validateCard: cb => {
      Card.findOne({ number: cardNumber, deleted: false })
        .then(response => {
          if (get(response, 'id')) {
            cb({ error: true, message: messages.es.card.exists });
          } else {
            cb();
          }
        }).catch(() => {
          cb({ error: true, message: messages.es.query });
        });
    },
    saveCreditCard: cb => {
      Card.create({
        _id: uuid.v4(),
        number: cardNumber,
        name: cardName,
        cvv,
        expiration
      }).then(response => {
        cb(null, response);
      }).catch(() => {
        cb({ error: true, message: messages.es.query });
      });
    }
  }, 1, (error, response) => {
    if (!error) {
      res.status(200).send({
        code: 200,
        error: false,
        message: messages.es.card.success,
        data: response.saveCreditCard
      });
    } else {
      res.status(500).send({
        code: 500,
        ...error,
        data: {}
      });
    }
  });
}

module.exports = {
  createCard
};
