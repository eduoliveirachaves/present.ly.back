const { Router } = require("express");
const { auth } = require("../middleware/auth");
const c = require("../controllers/gift.controller");

class GiftRoutes {
  routesFromGifts() {
    const giftRoutes = Router();

    giftRoutes.use(auth);

    /**
     * @swagger
     * /gift:
     *   post:
     *     summary: Cria um presente
     *     tags: [Gift]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *              properties:
     *              name: 
     *     responses:
     *       201:
     *         description: Presente criado com sucesso
     *       400:
     *         description: Erro ao criar presente
     */
    giftRoutes.post("/", c.createGift);

    /**
     * @swagger
     * /gift:
     *   get:
     *     summary: Lista todos os presentes
     *     tags: [Gift]
     *     responses:
     *       200:
     *         description: Lista de presentes
     *       400:
     *         description: Erro ao listar presentes
     */
    giftRoutes.get("/", c.getAllGifts);

    /**
     * @swagger
     * /gift/list:
     *   get:
     *     summary: Lista todas as listas de presentes
     *     tags: [List]
     *     responses:
     *       200:
     *         description: Listas obtidas com sucesso
     *       400:
     *         description: Erro ao obter as listas
     */
    giftRoutes.get("/list", c.getAllLists);

    /**
     * @swagger
     * /gift/list:
     *   post:
     *     summary: Cria uma nova lista de presentes
     *     tags: [List]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       201:
     *         description: Lista criada com sucesso
     *       400:
     *         description: Erro ao criar a lista
     */
    giftRoutes.post("/list", c.createList);

    /**
     * @swagger
     * /gift/list/{id}:
     *   get:
     *     summary: Obtém uma lista de presentes específica
     *     tags: [List]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da lista
     *     responses:
     *       200:
     *         description: Lista obtida com sucesso
     *       404:
     *         description: Lista não encontrada
     */
    giftRoutes.get("/list/:id", c.getGiftList);

    /**
     * @swagger
     * /gift/list/{id}:
     *   delete:
     *     summary: Exclui uma lista de presentes
     *     tags: [List]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da lista a ser excluída
     *     responses:
     *       200:
     *         description: Lista excluída com sucesso
     *       404:
     *         description: Lista não encontrada
     */
    giftRoutes.delete("/list/:id", c.deleteList);

    /**
     * @swagger
     * /gift/{id}:
     *   get:
     *     summary: Obtém um presente específico
     *     tags: [Gift]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do presente
     *     responses:
     *       200:
     *         description: Presente obtido com sucesso
     *       404:
     *         description: Presente não encontrado
     */
    giftRoutes.get("/:id", c.getOneGift);

    /**
     * @swagger
     * /gift/{id}:
     *   put:
     *     summary: Edita um presente
     *     tags: [Gift]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do presente a ser editado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Presente editado com sucesso
     *       400:
     *         description: Erro ao editar presente
     */
    giftRoutes.put("/:id", c.editGift);

    /**
     * @swagger
     * /gift/{id}:
     *   delete:
     *     summary: Exclui um presente
     *     tags: [Gift]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do presente a ser excluído
     *     responses:
     *       200:
     *         description: Presente excluído com sucesso
     *       404:
     *         description: Presente não encontrado
     */
    giftRoutes.delete("/:id", c.deleteGift);

    return giftRoutes;
  }
}

module.exports = new GiftRoutes();
