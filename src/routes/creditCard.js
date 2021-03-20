const express = require('express');

const { createCard, getCard, deleteCard } = require('../controllers/creditCard');

const router = express.Router();

router.post('/', createCard);
router.get('/:id', getCard);
router.delete('/:id', deleteCard);

module.exports = router;
