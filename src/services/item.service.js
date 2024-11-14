const { Items } = require("../models/item.model");

class ItemService {
  async create({ user_id, name, description, category, url, priority }) {
    try {
      const item = await Items.create({
        user_id,
        name,
        description,
        category,
        url,
        priority,
      });

      return { message: "Item criado com sucesso", item };
    } catch (error) {
      console.log(error);
      throw new Error(
        "Nao foi possivel criar o item, userId e nome: " + user_id + " " + name,
      );
    }
  }

  async getAll({ user_id, filter }) {
    try {
      const f = filter.category
        ? { user_id, category: filter.category }
        : { user_id };
      const orderFilter = filter.date
        ? [["created_at", "DESC"]]
        : [["priority", "DESC"]];
      const data = await Items.findAll({
        where: f,
        order: orderFilter,
      });

      return data.length ? data : null;
    } catch (error) {
      console.log("ESTA DANDO ERRO SERVICE " + error.message);
      throw new Error("Erro ao listar items");
    }
  }

  async getOne({ user_id, item_id }) {
    try {
      const data = await Items.findOne({
        where: {
          id: item_id,
          user_id,
        },
      });

      if (!data) {
        return;
      }

      return data;
    } catch (e) {
      console.log("SERVICE ERROR : ", e.message);
      throw new Error("Erro ao buscar item");
    }
  }

  async edit({ id, user_id, name, description, category, url, priority }) {
    try {
      const newItem = {
        name,
        description,
        category,
        url,
        priority,
      };
      const item = await Items.update(newItem, {
        where: { user_id, id },
      });

      if (item === 0) {
        return;
      }

      return await this.getOne({ user_id, item_id: id });
    } catch (e) {
      console.log("SERVICE ERROR : ", e.message);
      throw new Error("Erro ao atualizar item");
    }
  }

  async delete({ user_id, id }) {
    try {
      await Items.destroy({ where: { user_id, id } });

      return { message: "Item deletado com sucesso!" };
    } catch (e) {
      console.log(
        "ITEM A SER DELETADO: ",
        id,
        "USER ID",
        user_id,
        "ERROR MESSAGE: ",
        e.message,
      );
      throw new Error("Erro ao deletar item");
    }
  }
}

module.exports = new ItemService();
