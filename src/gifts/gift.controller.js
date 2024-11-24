const { config } = require("dotenv");
const GiftService = require("./gift.services");
const helper = require("../utils/responseHelper");

config();

class ItemsController {
  async createGift(req, res) {
    try {
      const user_id = req.user.id;
      const { name, description, url, priority, list_id } = req.body;

      if (!name || !url) {
        return res.status(400).send({
          data: "Nome e url são campos obrigatórios",
        });
      }

      const newItem = await GiftService.createGift({
        user_id,
        name,
        description: description || null,
        url,
        priority: priority || 0,
        list_id: list_id || null,
      });

      return helper.success(res, "Item criado com sucesso", newItem, 201);
    } catch (error) {
      return helper.error(res, error.message);
    }
  }

  async createList(req, res) {
    try {
      const user_id = req.user.id;
      const { name } = req.body;

      if (!name) {
        return helper.error(res, "Nome é um campo obrigatório", 400);
      }

      const newList = await GiftService.createList({ user_id, name });

      return helper.success(res, "Lista criada com sucesso", newList, 201);
    } catch (error) {
      return helper.error(res, error.message);
    }
  }

  //sem filtro ele pega por prioridade, o usuario tem a opcao de destacar algum item que ele queira mais
  async getAllGifts(req, res) {
    try {
      const user_id = req.user.id;
      const filter = {};

      //filtro por data
      if (req.query.date) filter.date = true;

      const allItems = await GiftService.getAllGifts({ user_id, filter });

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

  async getGiftList(req, res) {
    try {
      const user_id = req.user.id;
      const list_id = req.params.id;

      const list = await GiftService.getGiftList({ user_id, list_id });
      if (!list) {
        helper.error(res, "Lista esta vazia", 401);
      }

      helper.success(res, "Lista encontrada!", list);
    } catch {
      helper.error(res, "Nao foi possivel buscar pela lista", 400);
    }
  }

  async getOneGift(req, res) {
    try {
      const user_id = req.user.id;
      const item_id = req.params.id;
      const item = await GiftService.getOneGift({ user_id, item_id });

      if (!item) {
        return helper.error(res, "Item não encontrado", 400);
      }

      return helper.success(res, "Item encontrado", item, 200);
    } catch (e) {
      console.log(e.message);
      helper.error(res, "Erro ao buscar item");
    }
  }

  // Obtém todas as listas do usuário
  async getAllLists(req, res) {
    try {
      const user_id = req.user.id;
      const allLists = await GiftService.getAllLists({ user_id });

      if (!allLists || allLists.length === 0) {
        return helper.error(res, "Nenhuma lista encontrada", 400);
      }

      return helper.success(res, "Listas encontradas", allLists, 200);
    } catch (error) {
      console.log(error.message);
      return helper.error(res, "Erro ao buscar listas");
    }
  }

  // Obtém uma lista específica do usuário
  async getOneList(req, res) {
    try {
      const user_id = req.user.id;
      const list_id = req.params.id;
      const list = await GiftService.getOneList({ user_id, list_id });

      if (!list) {
        return helper.error(res, "Lista não encontrada", 400);
      }

      return helper.success(res, "Lista encontrada", list, 200);
    } catch (error) {
      console.log(error.message);
      return helper.error(res, "Erro ao buscar lista");
    }
  }

  async editGift(req, res) {
    try {
      const id = req.params.id;
      const user_id = req.user.id;
      const { name, description, url, priority, status } = req.body;

      const updated = await GiftService.editGift({
        id,
        user_id,
        name,
        description,
        url,
        priority,
        status,
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

  async editList(req, res) {
    try {
      const id = req.params.id;
      const user_id = req.user.id;
      const { name } = req.body;

      const updated = await GiftService.editList({ id, user_id, name });

      if (!updated) {
        return helper.error(res, "Lista não encontrada", 400);
      }

      return helper.success(res, "Lista editada com sucesso", updated);
    } catch (e) {
      console.log(e);
      return helper.error(res, "Erro ao editar lista");
    }
  }

  async deleteGift(req, res) {
    try {
      const user_id = req.user.id;
      const id = req.params.id;
      const item = await GiftService.deleteGift({ user_id, id });
      if (!item) {
        return helper.error(res, "Item não encontrado", 400);
      }

      return helper.success(res, "Item deletado com sucesso", item);
    } catch (e) {
      console.log(e.message);
      return helper.error(res, "Erro ao deletar item");
    }
  }

  async deleteList(req, res) {
    try {
      const user_id = req.user.id;
      const id = req.params.id;
      const list = await GiftService.deleteList({ user_id, id });
      if (!list) {
        return helper.error(res, "Lista não encontrada", 400);
      }

      return helper.success(res, "Lista deletada com sucesso", list);
    } catch (e) {
      console.log(e.message);
      return helper.error(res, "Erro ao deletar lista");
    }
  }
}

module.exports = new ItemsController();
