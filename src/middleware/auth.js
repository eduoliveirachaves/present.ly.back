const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");

config();

class Auth {
  async auth(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.user = verify(token, process.env.SECRET_JWT);
      next();
    } catch (error) {
      return res.status(401).send({ data: "Não autorizado" });
    }
  }
}

module.exports = new Auth();
