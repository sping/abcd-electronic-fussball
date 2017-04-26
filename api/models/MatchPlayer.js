const Sequelize = require('sequelize');
const database = require('../databaseConnection');
const Player = require('./Player.js');
const Match = require('./Match.js');

MatchPlayer = database.define('match_players',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    homeTeam: {
      type: Sequelize.BOOLEAN
    },
    playerId: {
      type: Sequelize.INTEGER,
      references: {
        model: Player,
        key: 'id'
      }
    },
    matchId: {
      type: Sequelize.INTEGER,
      references: {
        model: Match,
        key: 'id'
      }
    }
  }
);
MatchPlayer.afterUpdate((matchPlayer, options) => {
  const StatHelper = require('../helpers/StatHelper')
  StatHelper.updateStatsForMatchPlayer(matchPlayer.id)
  return matchPlayer
});

MatchPlayer.afterCreate((matchPlayer, options) => {
  const StatHelper = require('../helpers/StatHelper')
  StatHelper.updateStatsForMatchPlayer(matchPlayer.id)
  return matchPlayer
});

MatchPlayer.afterDestroy((matchPlayer, options) => {
  const StatHelper = require('../helpers/StatHelper')
  StatHelper.updateStatsForMatchPlayer(matchPlayer.id)
  return matchPlayer
});

module.exports = MatchPlayer
