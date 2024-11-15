const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

//o que exatamente vamos salvar? preco? nao, descricao? opcional, link? sim, categoria? opcional eu acho
//o que e possivel pegar do link?
//link e obrigatorio? sim

const Items = connection.define(
  "Items",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [2, 60],
      },
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [2, 100],
      },
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: {
        len: [2, 30],
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Items",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { Items: Items };
