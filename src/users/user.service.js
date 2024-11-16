const { Users } = require("./user.model");
const { sign } = require("jsonwebtoken");

class UserService {
  async createUser({
    name,
    lastName,
    hobbies,
    birthDate,
    phone,
    email,
    password,
  }) {
    try {
      await Users.create({
        name,
        lastName,
        birthDate,
        phone,
        email,
        password,
      });

      return { message: "Usuario salvo com sucesso!" };
    } catch (error) {
      console.log(error);
      throw new Error("Deu ruim");
    }
  }

  async findUserByEmail({ email }) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("E-mail ou senha incorreta");
    }

    return user;
  }

  async viewProfile({ id }) {
    try {
      const user = await Users.findOne({ where: { id } });
    } catch (e) {
      console.log(e.message);
      throw new Error("Erro ao buscar usuário");
    }
  }

  async editProfile({ id, name, lastName, birthDate, phone, email }) {
    try {
      const newUser = {
        name,
        lastName,
        birthDate,
        phone,
        email,
      };
      const user = await Users.update(newUser, { where: { id } });

      return await this.viewProfile({ id });
    } catch (e) {
      console.log(e.message);
      throw new Error("Erro ao editar usuário");
    }
  }
}

module.exports = new UserService();