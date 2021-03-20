const cardRoutes = require('./creditCard');

module.exports = app => {
  app.use('/api/v1', cardRoutes);
}
