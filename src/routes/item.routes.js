const { Router } = require("express");
const { auth } = require("../middleware/auth");
const { createItem, listAll } = require("../controllers/item.controller");


class ItemRoutes {
  routesFromItems() {
    const itemRoutes = Router();
    
    //criar item
    itemRoutes.post("/item", auth,  createItem);
    
    //listar todos os items
    itemRoutes.get("/item", auth, listAll)
    
    //editar um item
    // itemRoutes.put("/item", auth, editItem)
    
    return itemRoutes;
  }
}

module.exports = new ItemRoutes();