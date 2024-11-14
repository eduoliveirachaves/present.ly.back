const { config } = require("dotenv");
const UserService = require("../services/user.service");

config();

class UsersController {
  async createUser(req, res) {
    try {
      const { name, lastName, hobbies, birthDate, phone, email, password } =
        req.body;

      const data = await UserService.createUser({
        name,
        lastName,
        hobbies,
        birthDate,
        phone,
        email,
        password,
      });
      return res.status(201).send({ data: "Usuario salvo com sucesso!" });
    } catch (error) {
      return res.status(400).send({
        data: "Erro ao criar usuário",
        error: error.message,
      });
    }
  }
}

module.exports = new UsersController();
