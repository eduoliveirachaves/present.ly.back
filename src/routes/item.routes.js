const { Router } = require("express");
const { auth } = require("../middleware/auth");
const c = require("../controllers/item.controller");

class ItemRoutes {
  routesFromItems() {
    const itemRoutes = Router();

    itemRoutes.use(auth)
    // create
    itemRoutes.post("/", c.createItem);

    // list
    itemRoutes.get("/", c.listAll);
    itemRoutes.get("/:id", c.listOneItem);

    // edit
    itemRoutes.put("/:id", c.editItem);

    // delete
    itemRoutes.delete("/:id", c.deleteItem);

    return itemRoutes;
  }
}

module.exports = new ItemRoutes();
