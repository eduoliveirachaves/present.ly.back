const { Gifts } = require("../models/gift.model");
const { Lists } = require("../models/list.model");

class GiftServices {
  async createGift({ user_id, name, description, url, priority, list_id }) {
    try {
      // Encontra ou cria uma lista com base no list_id e user_id se fornecido
      let list;
      if (!list_id) {
        const list_name = "Minha Lista";
        [list] = await Lists.findOrCreate({
          where: { name: list_name, user_id },
        });
      } else {
        list = await Lists.findOne({
          where: { id: list_id, user_id },
        });
      }

      const gift = await Gifts.create({
        user_id,
        name,
        description,
        url,
        priority,
      });

      await list.addGift(gift);

      return gift;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Não foi possível criar o item, userId e nome: " + user_id + " " + name,
      );
    }
  }

  createList({ user_id, name }) {
    try {
      // Cria uma nova lista com o user_id e nome fornecidos
      return Lists.create({ user_id, name });
    } catch (error) {
      // Loga o erro e lança uma nova mensagem de erro
      console.log(error);
      throw new Error("Nao foi possivel criar a lista");
    }
  }

  async getGiftList({ user_id, list_id }) {
    try {
      const list = await Lists.findOne({ where: { id: list_id, user_id } });
      if (!list) {
        throw new Error("Lista não encontrada");
      }

      const gifts = await list.getGifts();

      return { list, gifts };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar a lista");
    }
  }

  async getAllGifts({ user_id, filter }) {
    try {
      // Cria um filtro baseado na categoria, se fornecida
      const f = filter.category
        ? { user_id, category: filter.category }
        : { user_id };

      // Define a ordem dos resultados com base na data ou prioridade
      const orderFilter = filter.date
        ? [["created_at", "DESC"]]
        : [["priority", "DESC"]];

      // Busca todos os presentes que correspondem ao filtro e ordem
      const data = await Gifts.findAll({
        where: f,
        order: orderFilter,
      });

      // Retorna os dados encontrados ou null se nenhum presente for encontrado
      return data.length ? data : null;
    } catch (error) {
      // Loga o erro e lança uma nova mensagem de erro
      console.log(error);
      throw new Error("Nao foi possivel obter os presentes");
    }
  }

  async getOneGift({ user_id, item_id }) {
    try {
      const data = await Gifts.findOne({
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

  async editGift({
    id,
    user_id,
    name,
    description,
    category,
    url,
    priority,
    status,
  }) {
    try {
      const newItem = {
        name,
        description,
        category,
        url,
        priority,
        status,
      };
      const item = await Gifts.update(newItem, {
        where: { user_id, id },
      });

      if (item[0] === 0) {
        console.log("ITEM NAO ENCONTRADO");
        return;
      }

      return await this.getOneGift({ user_id, item_id: id });
    } catch (e) {
      console.log("SERVICE ERROR : ", e.message);
      throw new Error("Erro ao atualizar item");
    }
  }

  async deleteGift({ user_id, id }) {
    try {
      const itemDeleted = this.getOneGift({ user_id, item_id: id });
      const linesDeleted = await Gifts.destroy({ where: { user_id, id } });

      return linesDeleted === 0 ? null : itemDeleted;
    } catch (e) {
      console.log(e.message);
      throw new Error("Erro ao deletar item");
    }
  }
}

module.exports = new GiftServices();
