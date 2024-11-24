"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GiftList", {
      list_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lists",
          key: "id",
        },
        primaryKey: true,
      },
      gift_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Gifts",
          key: "id",
        },
        primaryKey: true,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GiftList");
  },
};
