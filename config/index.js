require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  db: process.env.MONGO || 'mongodb+srv://test:test@clip-cards.nbnoq.mongodb.net/cards',
  port: process.env.PORT || 3000
};

module.exports = config;
