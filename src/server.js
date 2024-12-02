require("./database/associations");
const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");
const routes = require("./routes");
const { swaggerDocs, swaggerUi } = require("./docs/swagger");

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.allRoutes(server);
    this.initializeServer(server);
  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  async database() {
    try {
      await connection.authenticate();
      console.log("Conexão bem sucedida!");
    } catch (error) {
      console.log("Erro ao conectar com o banco de dados: ", error);
      throw error;
    }
    try {
      await connection.sync();
      console.log("Tabelas criadas!");
    } catch (error) {
      console.log("Erro ao criar as tabelas: ", error);
      throw error;
    }
  }

  async initializeServer(app) {
    const PORT = process.env.PORT || 3333;

    app.listen(PORT, () =>
      console.log(`Servidor rodando em http://localhost${PORT}`),
    );
  }

  async allRoutes(app) {
    app.use(routes);
  }
}

module.exports = { Server };
