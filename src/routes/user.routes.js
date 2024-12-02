const { Router } = require("express");
const { auth } = require("../middleware/auth");
const {
  createUser,
  viewProfile,
  editProfile,
  editPassword,
} = require("../controllers/user.controller");

class UsersRoutes {
  routesFromUsers() {
    const usersRoutes = Router();

    /**
     * @swagger
     * /user/signup:
     *   post:
     *     summary: Cria um novo usuário
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "John"
     *               lastName:
     *                 type: string
     *                 example: "Doe"
     *               email:
     *                 type: string
     *                 example: "john.doe@example.com"
     *               password:
     *                 type: string
     *                 example: "Senha123"
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *       400:
     *         description: Erro ao criar usuário
     */
    usersRoutes.post("/user/signup", createUser);

    /**
     * @swagger
     * /user:
     *   get:
     *     summary: Obtém o perfil do usuário autenticado
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados do usuário
     *       401:
     *         description: Não autorizado
     */
    usersRoutes.get("/user", auth, viewProfile);

    /**
     * @swagger
     * /user/me:
     *   put:
     *     summary: Edita o perfil do usuário
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "John"
     *               lastName:
     *                 type: string
     *                 example: "Doe"
     *               email:
     *                 type: string
     *                 example: "john.doe@example.com"
     *               phone:
     *                 type: string
     *                 example: "123456789"
     *     responses:
     *       200:
     *         description: Perfil editado com sucesso
     *       400:
     *         description: Erro ao editar perfil
     *       401:
     *         description: Não autorizado
     */
    usersRoutes.put("/user/me", auth, editProfile);

    /**
     * @swagger
     * /user/security:
     *   put:
     *     summary: Atualiza a senha do usuário
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               password:
     *                 type: string
     *                 example: "NovaSenha123"
     *     responses:
     *       200:
     *         description: Senha atualizada com sucesso
     *       400:
     *         description: Erro ao atualizar a senha
     *       401:
     *         description: Não autorizado
     */
    usersRoutes.put("/user/security", auth, editPassword);

    return usersRoutes;
  }
}

module.exports = new UsersRoutes();
