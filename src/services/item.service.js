const {Items} = require('../models/item.model');

class ItemService {
  async createItem({
    user_id,
    name,
    description,
    category,
    price,
    url
  }) {
    try {
      await Items.create({
        user_id,
        name,
        description,
        category,
        price,
        url
      })
      
      return {message: "Item salvo com sucesso!"};
    } catch (error) {
      console.log(error)
      throw new Error('Nao foi possivel criar o item userId e nome: ' + user_id + ' ' + name)
    }
  }
  
  async listAllItems({user_id}) {
    try {
      const data = await Items.findAll({where: {user_id}});
      return {message: "Items listados com sucesso", data};
      
    } catch (error) {
      console.log("ESTA DANDO ERRO AQUI " + error.message)
      return {message: "Erro ao listar items"}
    }
  }
}

module.exports = new ItemService();