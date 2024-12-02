const { login } = require("../controllers/auth.controller");
const { Router } = require("express");

class AuthRoutes {
  routesFromAuth() {
    const authRoutes = Router();

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Realiza o login do usuário
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "john.doe@example.com"
     *               password:
     *                 type: string
     *                 example: "Password123"
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *       400:
     *         description: Campos obrigatórios não foram fornecidos
     *     
     */
    authRoutes.post("/auth/login", login);

    return authRoutes;
  }
}

module.exports = new AuthRoutes();
