const { config } = require("dotenv");

config();
//db config local
module.exports = {
  host: process.env.HOST, 
  port: process.env.PORTDB,
  database: process.env.DATABASE,
  password: process.env.PASSWORDDB,
  username: process.env.USERNAMEDB,
  dialect: process.env.DIALECT,
  define: {
    underscored: true,
    underscoredAll: true,
  },
};
