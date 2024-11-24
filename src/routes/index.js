const { Router } = require("express");
const { routesFromAuth } = require("../auth/auth.routes");
const { routesFromUsers } = require("../users/user.routes");
const { routesFromGifts } = require("../gifts/gift.routes.js");
const routes = Router();

routes.use("/api", [
  routesFromAuth(),
  routesFromUsers(),
  [routes.use("/gift", routesFromGifts())],
]);

module.exports = routes;
