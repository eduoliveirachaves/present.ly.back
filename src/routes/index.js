const { Router } = require('express');
const { routesFromAuth } = require('./auth.routes');
const { routesFromUsers } = require('./user.routes');
const { routesFromItems } = require('./item.routes.js');
const routes = Router();

routes.use('/api', [
  routesFromAuth(),
  routesFromUsers(),
  routesFromItems()
]);

module.exports = routes;