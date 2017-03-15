'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'match_players',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        homeTeam: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        playerId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'players',
              key: 'id'
          }
        },
        matchId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'matches',
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
    return queryInterface.dropTable('match_players')
  }
};
