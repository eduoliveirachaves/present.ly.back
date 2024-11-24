const { Router } = require("express");
const { auth } = require("../middleware/auth");
const c = require("./gift.controller");

class GiftRoutes {
  routesFromGifts() {
    const giftRoutes = Router();

    giftRoutes.use(auth);

    // create
    giftRoutes.post("/", c.createGift);

    // list
    giftRoutes.get("/", c.getAllGifts);
    giftRoutes.get("/:id", c.getOneGift);
    giftRoutes.get("/list/:id", c.getGiftList);

    // edit
    giftRoutes.put("/:id", c.editGift);

    // delete
    giftRoutes.delete("/:id", c.deleteGift);

    return giftRoutes;
  }
}

module.exports = new GiftRoutes();
