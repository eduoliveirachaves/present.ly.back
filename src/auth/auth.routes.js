const { login } = require("./auth.controller");
const { Router } = require("express");

class AuthRoutes {
  routesFromAuth() {
    const authRoutes = Router();

    authRoutes.post("/auth/login", login);

    return authRoutes;
  }
}

module.exports = new AuthRoutes();
