const { Router } = require("express");
const { auth } = require("../middleware/auth");
const c = require("./item.controller");

class ItemRoutes {
  routesFromItems() {
    const itemRoutes = Router();

    itemRoutes.use(auth);

    // create
    itemRoutes.post("/", c.createItem);

    // list
    itemRoutes.get("/", c.getAllItems);
    itemRoutes.get("/:id", c.getOneItem);

    // edit
    itemRoutes.put("/:id", c.editItem);

    // delete
    itemRoutes.delete("/:id", c.deleteItem);

    return itemRoutes;
  }
}

module.exports = new ItemRoutes();
