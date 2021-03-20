import express from 'express';
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
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
if (global.env !== 'test') {
  app.use(logger('dev'));
}

// import all routes
routes(app);

// connect databse MongoDB
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port} `);
  });
}).catch(error => {
  console.log(`No se pudo conectar a la BD ${error}`);
});
