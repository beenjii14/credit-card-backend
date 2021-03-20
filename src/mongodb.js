const mongoose = require('mongoose');
const config = require('../config');

// connect databse MongoDB
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log('Database success');
}).catch(error => {
  console.log(`No se pudo conectar a la BD ${error}`);
});
