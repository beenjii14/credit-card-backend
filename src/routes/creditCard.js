const express = require('express');

const { createCard, getListCard, getCard, deleteCard } = require('../controllers/creditCard');

const router = express.Router();

router.post('/card', createCard);
router.get('/card', getListCard);
router.get('/card/:id', getCard);
router.delete('/card/:id', deleteCard);

module.exports = router;
