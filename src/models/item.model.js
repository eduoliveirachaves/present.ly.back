const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

//o que exatamente vamos salvar? preco? descricao? link? categoria?
//o que e possivel pegar do link?
//link e obrigatorio?

const Items = connection.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [2, 20],
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
  },
  {
    tableName: "Product",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = { Products: Items };
