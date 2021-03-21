require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  db: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI_PROD,
  port: process.env.PORT || 8080
};

module.exports = config;
