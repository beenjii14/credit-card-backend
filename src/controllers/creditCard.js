const async = require('async');
const get = require('lodash.get');
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
      res.status(201).send({
        code: 201,
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

const getCard = (req, res) => {
  const { id } = req.params;

  async.auto({
    validateId: cb => {
      if (id && id !== '') {
        cb();
      } else {
        cb({ error: true, message: messages.es.query });
      }
    },
    getDataCard: cb => {
      Card.findById(id).then(response => {
        if (get(response, '_id')) {
          cb(null, response);
        } else {
          cb({ code: 404, error: true, message: messages.es.card.notFound });
        }
      }).catch(() => cb({ code: 500, error: true, message: messages.es.query }));
    }
  }, 1, (error, response) => {
    if (!error) {
      res.status(200).send({
        code: 200,
        error: false,
        message: null,
        data: response.getDataCard
      });
    } else {
      res.status(error.code).send({
        ...error,
        data: {}
      });
    }
  });
}

const getListCard = (req, res) => {
  async.auto({
    getListCards: cb => {
      Card.find({ deleted: false }).then(response => {
          cb(null, response);
      }).catch(() => cb({ code: 500, error: true, message: messages.es.query }));
    },
    pagination: cb => {
      // TODO: Create pagination
      cb();
    }
  }, 1, (error, response) => {
    if (!error) {
      res.status(200).send({
        code: 200,
        error: false,
        message: null,
        data: {
          records: response.getListCards
        }
      });
    } else {
      res.status(error.code).send({
        ...error,
        data: {}
      });
    }
  });
}

const deleteCard = (req, res) => {
  const { id } = req.params;
  async.auto({
    validateId: cb => {
      if (id && id !== '') {
        cb();
      } else {
        cb({ error: true, message: messages.es.query });
      }
    },
    deleteCard: cb => {
      // Make logical delete
      Card.findByIdAndUpdate(id, { deleted: true }).then(response => {
        if (get(response, '_id')) {
          cb();
        } else {
          cb({ code: 404, error: true, message: messages.es.card.notFound });
        }
      }).catch(() => cb({ code: 500, error: true, message: messages.es.query }));
    }
  }, 1, (error) => {
    if (!error) {
      res.status(200).send({
        code: 200,
        error: false,
        message: messages.es.card.deleted,
        data: {}
      });
    } else {
      res.status(error.code).send({
        ...error,
        data: {}
      });
    }
  });
}

module.exports = {
  createCard,
  getCard,
  getListCard,
  deleteCard
};
