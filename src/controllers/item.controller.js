const { config } = require("dotenv");
const ItemService = require("../services/item.service");
const helper = require("../helpers/responseHelper");

config();

class ItemsController {
  async createItem(req, res) {
    try {
      const user_id = req.user.id;
      const { name, description, category, url } = req.body;

      if (!name || !url) {
        return res.status(400).send({
          data: "Nome e url são campos obrigatórios",
        });
      }

      const newItem = await ItemService.create({
        user_id,
        name,
        description: description || null,
        category: category || null,
        url,
      });

      return helper.success(res, "Item criado com sucesso", newItem, 201);
    } catch (error) {
      return helper.error(res, error.message);
    }
  }

  async getAllItems(req, res) {
    try {
      const user_id = req.user.id;
      const filter = {};

      //filtro por categoria ou por data
      if (req.query.category) filter.category = req.query.category;
      if (req.query.date) filter.date = true;

      const allItems = await ItemService.getAll({ user_id, filter });

      // caso nao tenha items cadastrados
      if (!allItems || allItems.length === 0) {
        return helper.error(res, "Nenhum item encontrado", 400);
      }

      return helper.success(res, "Items encontrados", allItems, 200);
    } catch (error) {
      console.log(error.message);
      return helper.error(res, "Erro ao buscar items");
    }
  }

  async getOneItem(req, res) {
    try {
      const user_id = req.user.id;
      const item_id = req.params.id;
      const item = await ItemService.getOne({ user_id, item_id });

      if (!item) {
        return helper.error(res, "Item não encontrado", 400);
      }

      return helper.success(res, "Item encontrado", item, 200);
    } catch (e) {
      console.log(e.message);
      helper.error(res, "Erro ao buscar item");
    }
  }

  async editItem(req, res) {
    try {
      const id = req.params.id;
      const user_id = req.user.id;
      const { name, description, category, url } = req.body;
      const updated = await ItemService.edit({
        id,
        user_id,
        name,
        description,
        category,
        url,
      });

      if (!updated) {
        return helper.error(res, "Item não encontrado", 400);
      }

      return helper.success(res, "Item editado com sucesso", updated);
    } catch (e) {
      console.log(e);
      return helper.error(res, "Erro ao editar item");
    }
  }

  async deleteItem(req, res) {
    try {
      const user_id = req.user.id;
      const id = req.params.id;
      const item = await ItemService.delete({ user_id, id });

      return helper.success(res, "Item deletado com sucesso", item);
    } catch (e) {
      console.log(e.message);
      return helper.error(res, "Erro ao deletar item");
    }
  }
}

module.exports = new ItemsController();
