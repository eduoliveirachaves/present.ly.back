const {config} = require("dotenv");
const ItemService = require("../services/item.service");

config();

class ItemsController {
  async createItem(req, res) {
    try {
      const user_id = req.user.id;
      const {
        name, description, category, price, url
      } = req.body;

      await ItemService.create({
        user_id, name, description, category: category || null, price: price || null, url: url || null
      })

      return res
        .status(201)
        .send({data: "Item criado com sucesso!"});
    } catch (error) {
      return res.status(400).send({
        data: "Erro ao criar item", error: error.message,
      });
    }
  }

  async listAll(req, res) {
    try {
      const user_id = req.user.id;

      const allItems = await ItemService.listAll({user_id});

      res.json({data: allItems}).status(400)
    } catch (error) {
      console.log(error.message)
      return res.status(400).send({
        data: "Nao foi possivel listar os Items", error: error.message
      })
    }
  }

  async listOneItem(req, res) {
    try {
      const user_id = req.user.id;
      const item_id = req.params.id;

      const item = await ItemService.findOne({user_id, item_id});

      res.json({data: item});
    } catch (e) {
      console.log(e.message)
    }
  }

  async editItem(req, res) {
    try {
      const id = req.params.id;
      const user_id = req.user.id;
      const {
        name, description, category, price, url
      } = req.body;
      const updated = await ItemService.edit({id, user_id, name, description, category, price, url});
      res.json({message: "Item editado com sucesso: ", updated}).status(200)
    } catch (e) {
      console.log(e)
      res.send({
        message: "Um erro ocorreu ao editar o item", error: e.message
      }).status(401)
    }
  }

  async deleteItem(req, res) {
    try {
      const user_id = req.user.id;
      const id = req.params.id;
      const item = await ItemService.delete({user_id, id})

      return res.json(item).status(200);
    } catch (e) {
      res.send(e.message).status(401);
      console.log(e.message)
    }
  }

}

module.exports = new ItemsController();