'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'stats',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        gamesWon: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        gamesLost: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        gameRatio: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0
        },
        goalsFor: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        goalsAgainst: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        goalsDiff: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        playerId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'players',
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
    return queryInterface.dropTable('stats')
  }
};
