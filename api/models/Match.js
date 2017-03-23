const
  Sequelize = require('sequelize'),
  database = require('databaseConnection')

const StatHelper = require('../helpers/StatHelper')

Match = database.define('matches',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

Match.afterUpdate(async (match, options) => {
  await StatHelper.updateStatsForMatch(match)
  return match
});

Match.afterDestroy(async (match, options) => {
  await StatHelper.updateStatsForMatch(match)
  return match
});

module.exports = Match
