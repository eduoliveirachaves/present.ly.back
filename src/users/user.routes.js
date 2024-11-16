const { createUser, viewProfile, editProfile } = require("./user.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class UsersRoutes {
  routesFromUsers() {
    const usersRoutes = Router();

    usersRoutes.post("/user/signup", createUser);
    usersRoutes.get("/user/", auth, viewProfile);
    usersRoutes.post("/user/", auth, editProfile);

    return usersRoutes;
  }
}

module.exports = new UsersRoutes();
