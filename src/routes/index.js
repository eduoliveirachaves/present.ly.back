const { Router } = require('express');
const { routesFromAuth } = require('./auth.routes');
const { routesFromUsers } = require('./user.routes');

const routes = Router();

routes.use('/api', [
  routesFromAuth(),
  routesFromUsers()
]);

module.exports = routes;