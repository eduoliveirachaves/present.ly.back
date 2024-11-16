const { config } = require("dotenv");
const UserService = require("./user.service");
const helper = require("./../utils/responseHelper");

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

  async viewProfile(req, res) {
    try {
      const id = req.user.id;
      const user = await UserService.viewProfile({ id });

      return helper.success(res, "", user, 200);
    } catch (e) {
      return helper.error(res, e.message);
    }
  }

  async editProfile(req, res) {
    try {
      const id = req.user.id;
      const { name, lastName, birthDate, phone, email, password } = req.body;
      const data = await UserService.editProfile({
        id,
        name,
        lastName,
        birthDate,
        phone,
        email,
      });
      return helper.success(res, "Usuario editado com sucesso", data);
    } catch (error) {
      return helper.error(res, "Erro ao editar usuário");
    }
  }
}

module.exports = new UsersController();
