const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const GiftList = connection.define(
  'GiftList',
  {
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lists',
        key: 'id',
      },
      primaryKey: true,
    },
    gift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Gifts',
        key: 'id',
      },
      primaryKey: true,
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
    tableName: 'GiftList',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = { GiftList };