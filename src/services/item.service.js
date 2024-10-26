const {Items} = require('../models/item.model');

class ItemService {
  
  
  async createItem({userId, name, link}) {
    try {
      await Items.createItem({
        userId,
        name,
        link,
      })
      return {message: "Item criado com sucesso!"}
      
    } catch (error) {
      console.log(error)
      throw new Error("Criacao do item falhou")
    }
  }
  
  async editItem({}) {
    try {
      
      
      return {message: "Item modificado com sucesso!"}
    } catch (error) {
      console.log(error)
      throw new Error("Nao foi possivel modificar o item")
    }
  }
  
  async deleteItem({id}) {
    try {
      await Items.deleteItem(id)
      
      return {message: "Item deletado com sucesso!"}
    } catch (error) {
      console.log(error)
      throw new Error("Nao foi possivel deletar o item")
    }
  }
}

module.exports = new ItemService();