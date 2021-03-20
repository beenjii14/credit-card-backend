const express = require('express');

const { createCard } = require('../controllers/creditCard');

const router = express.Router();

router.post('/', createCard);

module.exports = router;
