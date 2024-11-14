const { c } = require("../controllers/user.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class UsersRoutes {
  routesFromUsers() {
    const usersRoutes = Router();

    usersRoutes.post("/user/signup", c.createUser);

    return usersRoutes;
  }
}

module.exports = new UsersRoutes();
