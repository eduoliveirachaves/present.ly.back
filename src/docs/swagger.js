const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuração básica do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API de Presentes", 
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local",
      },
    ],
  },
  apis: [__dirname + "/../routes/*.js"],
};  

const swaggerDocs = swaggerJsDoc(swaggerOptions); 

module.exports = {
  swaggerDocs,
  swaggerUi,
};
