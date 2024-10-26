const {config} = require("dotenv");
const ItemService = require("../services/item.service");

config();

class ItemsController {
  async createItem(req, res) {
    try {
      const userId = req.user.id;
      const {
        name,
        link
      } = req.body;
      
      const data = await ItemService.createItem({
        userId,
        name,
        link
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
  
  async editItem(req, res) {
    try {
      const userId = req.user.id;
      const {
        name,
        link
      } = req.body;
      
      const data = await ItemService.editItem({
        userId,
        name,
        link
      })
      
      return res
        .status(201)
        .send({data: "Item editado com sucesso!"});
    } catch (error) {
      return res.status(400).send({
        data: "Erro ao editar item",
        error: error.message,
      });
    }
  }
  
}

module.exports = new ItemsController();