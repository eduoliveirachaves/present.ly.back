const {body, validationResult} = require("express-validator");

class Validation {
  async validateCreateItem(req, res, next) {
    
    await body("name").isString().run(req);
    await body("link").isString().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }
    next();
  }
}

module.exports = new Validation();