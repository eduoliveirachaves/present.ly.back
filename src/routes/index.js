const { Router } = require("express");
const { routesFromAuth } = require("./auth.routes");
const { routesFromUsers } = require("./user.routes");
const { routesFromGifts } = require("./gift.routes.js");

const routes = Router();

routes.use("/api", [
  routesFromAuth(),
  routesFromUsers(),
  [routes.use("/gift", routesFromGifts())],
]);
module.exports = routes; 
