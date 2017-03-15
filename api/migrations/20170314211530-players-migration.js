'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'players',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'users',
              key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'latin1' // default: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
  }
};
