const {Items} = require('../models/item.model');

class ItemService {
  async create({
    user_id, name, description, category, price, url
  }) {
    try {
      await Items.create({
        user_id, name, description, category, price, url
      })

      return {message: "Item salvo com sucesso!"};
    } catch (error) {
      console.log(error)
      throw new Error('Nao foi possivel criar o item userId e nome: ' + user_id + ' ' + name)
    }
  }

  async listAll({user_id}) {
    try {
      const data = await Items.findAll({where: {user_id}});

      if (!data) {
        return {message: "Sua lista esta vazia"}
      }

      return {message: "Items listados com sucesso", data};

    } catch (error) {
      console.log("ESTA DANDO ERRO AQUI " + error.message)
      return {message: "Erro ao listar items"}
    }
  }

  async findOne({user_id, item_id}) {
    try {
      const data = await Items.findOne({
        where: {
          id: item_id, user_id
        }
      });

      if (!data) {
        return {message: "Item nao existe"}
      }

      return {message: "Item achado: ", data};

    } catch (e) {
      console.log(e.message);
      console.log("Erro ao buscar Item")
      return {message: "Erro ao buscar item"}
    }
  }

  async edit({
    id, user_id, name, description, category, price, url
  }) {
    try {
      const item = {
        name, description, category, price, url,
      }
      await Items.update(item, {
        where: {user_id, id},
      },);

      const itemUpdated = await this.findOne({user_id, item_id: id});

      return {message: "Item atualizado!", data: itemUpdated};

    } catch (e) {
      console.log(e.message);
      return {
        message: "Erro ao atualizar item",
        error: e.message
      }
    }
  }

  async delete({user_id, id}) {
    try {
      const deletedAt = new Date();
      await Items.update({deleted_at: deletedAt}, {where: {user_id, id}});

      return {message: "Item deletado com sucesso!"}
    } catch (e) {
      console.log(e.message)
      return {
        message: "Erro ao deletar item ID: ", id,
        error: e.message
      }
    }
  }
}


module.exports = new ItemService();