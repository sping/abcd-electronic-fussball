const Sequelize = require('sequelize');
const database = require('../databaseConnection');

Stat = database.define('stats',
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
      defaultValue: 0
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
        model: Player,
        key: 'id'
      }
    }
  });

module.exports = Stat
