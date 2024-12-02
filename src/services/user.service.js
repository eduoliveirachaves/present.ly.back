const { Users } = require("../models/user.model");
const { sign } = require("jsonwebtoken");
const giftService = require("./gift.services");
const { password } = require("../config/database.config");

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
      const data = await Users.create({
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

  //ver o proprio perfil
  //? tem que passar pela auth, se passou tem perfil
  async viewProfile({ id }) {
    try {
      const user = await Users.findOne({ where: { id } });
      return user;
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
      await Users.update(newUser, { where: { id } });

      return await this.viewProfile({ id });
    } catch (e) {
      console.log(e.message);
      throw new Error("Erro ao editar usuário");
    }
  }

  async editPassword({ id, senha }) {
    try {
      const user = await Users.findByPk(id);
      console.log("que?")
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      
      user.password = senha;
      //usa o model user pra atualizar a senha para hash ao inves dela descriptografada
      await user.save();
      
      return this.viewProfile({ id });
    } catch (error) {
      console.log(error.message);
      throw new Error("Erro ao editar a senha");
    }
  }
}

module.exports = new UserService();
