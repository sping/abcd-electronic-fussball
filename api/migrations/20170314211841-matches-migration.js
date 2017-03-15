'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'matches',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        kind: {
          type: Sequelize.STRING,
          allowNull: false
        },
        playedAt: {
          type: Sequelize.DATE
        },
        homeScore: {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 0
        },
        awayScore: {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 0
        },
        notes: {
          type: Sequelize.TEXT
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
    return queryInterface.dropTable('matches')
  }
};
