const { Users } = require("./user.model");
const { config } = require("dotenv");
const { sign } = require("jsonwebtoken");
const AuthService = require("./auth.service");

config();

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send({ data: "Campos obrigatórios não foram fornecidos" });
      }

      const data = await AuthService.login({ email, password });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(401).send({
        data: "Erro ao logar usuário",
        error: error.message,
      });
    }
  }
}

module.exports = new AuthController();
