'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable('Items', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          len: [2, 20],
        },
      },
      description: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      category: {
        type: Sequelize.STRING(20),
        allowNull: true,
        validate: {
          len: [2, 20],
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          isDecimal: true,
        },
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};
