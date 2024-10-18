const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");

config();

class Auth {
    async auth(req, res, next) {
        try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = verify(token, process.env.SECRET_JWT);
        req.user = decode;
        next();
        } catch (error) {
        return res.status(401).send({ data: "Não autorizado" });
        }
    }
    }

    module.exports = new Auth();