const { Users } = require("../models/user.model");
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
}

module.exports = new UserService();
