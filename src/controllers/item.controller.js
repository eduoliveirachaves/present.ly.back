const {config} = require("dotenv");
const ItemService = require("../services/item.service");

config();

class ItemsController {
  async createItem(req, res) {
    try {
      const user_id = req.user.id;
      const {
        name,
        description,
        category,
        price,
        url
      } = req.body;
      
      const data = await ItemService.createItem({
        user_id,
        name,
        description,
        category: category || null,
        price: price || null,
        url: url || null
      })
      
      return res
        .status(201)
        .send({data: "Item criado com sucesso!"});
    } catch (error) {
      return res.status(400).send({
        data: "Erro ao criar item",
        error: error.message,
      });
    }
  }
  
  async listAll(req, res) {
    try {
      const user_id = req.user.id;
      console.log("USER ID " + user_id);
      const allItems = await ItemService.listAllItems({user_id});
      console.log("ALL ITEMS " + allItems);
      res.json({data: allItems})
    } catch (error) {
      console.log(error.message)
    }
    
  }
}

module.exports = new ItemsController();