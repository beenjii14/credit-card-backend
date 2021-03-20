require('./mongodb');
import express from 'express';
const cors = require('cors');
const logger = require('morgan');
const app = express();

const routes = require('./routes');

// variable configuration file
const config = require('../config');

// this is CORS-enabled for all origins
app.use(cors());

// the express.json() function is a built-in middleware function in Express.
// it parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// track requests in production and development only
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

// import all routes
routes(app);

const server = app.listen(config.port, () => {
  console.log(`Escuchando en el puerto ${config.port} `);
});

module.exports = { app, server };
