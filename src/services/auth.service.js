const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const UserService = require('./user.service')
const { config } = require("dotenv");

config();

class AuthService {
  async login({
    email,
    password
  }) {
    try {
      const verify = await this.verifyPassword(email, password)

      if (!verify.success) {
        throw new Error(verify.message);
      }

      const token = sign({ id: verify.user.id, email: verify.user.email }, process.env.SECRET_JWT, {
        expiresIn: "1d",
      });

      return { message: verify.message, token };
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  async verifyPassword(email, plainTextPassword) {
    try {
      const user = await UserService.findUserByEmail({ email });
  
      const isPasswordCorrect = await bcrypt.compare(plainTextPassword, user.password);
  
      if (isPasswordCorrect) {
        return { success: true, message: "Autenticação bem-sucedida", user };
      } else {
        return { success: false, message: "E-mail ou senha incorreta" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = new AuthService();