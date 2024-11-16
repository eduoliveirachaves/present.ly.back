const { Items } = require("./item.model");

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

      return item;
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

      if (item[0] === 0) {
        console.log("ITEM NAO ENCONTRADO");
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
      const itemDeleted = this.getOne({ user_id, item_id: id });
      const linesDeleted = await Items.destroy({ where: { user_id, id } });

      return linesDeleted === 0 ? null : itemDeleted;
    } catch (e) {
      console.log(e.message);
      throw new Error("Erro ao deletar item");
    }
  }
}

module.exports = new ItemService();
