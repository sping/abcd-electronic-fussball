const
  Sequelize = require('sequelize'),
  database = require('databaseConnection')

Match = database.define('matches',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    kind: {
      type: Sequelize.ENUM('SINGLE', 'DOUBLE')
    },
    playedAt: {
      type: Sequelize.DATE
    },
    homeScore: {
      type: Sequelize.INTEGER,
      default: 0
    },
    awayScore: {
      type: Sequelize.INTEGER,
      default: 0
    },
    notes: {
      type: Sequelize.TEXT
    }
  });

module.exports = Match
