const { Router } = require("express");
const { auth, validation } = require("../middleware/");
const { item } = require("../controllers/item.controller");


class ItemRoutes {
  routesFromItems() {
    const itemRoutes = Router();

    //auth / validation = middleware
    itemRoutes.post("/item", auth, item.createItem);
    
    //list all items
    // itemRoutes.get("/item", item.getItems);
    itemRoutes.put("/item/:id", auth, item.editItem);
    // itemRoutes.delete("/item/:id item.deleteItem);

    return itemRoutes;
  }
}

module.exports = new ItemRoutes();