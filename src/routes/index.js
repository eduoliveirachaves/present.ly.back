const { Router } = require("express");
const { routesFromAuth } = require("../users/auth.routes");
const { routesFromUsers } = require("../users/user.routes");
const { routesFromItems } = require("../items/item.routes.js");
const routes = Router();

routes.use("/api", [
  routesFromAuth(),
  routesFromUsers(),
  [routes.use("/item", routesFromItems())],
]);

module.exports = routes;
