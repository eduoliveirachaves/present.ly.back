const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Gifts = connection.define(
  'Gifts',
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
        model: 'Users',
        key: 'id',
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
    status: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: 'Não comprado',
      validate: {
        len: [2, 30],
      },
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'Gifts',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = { Gifts };