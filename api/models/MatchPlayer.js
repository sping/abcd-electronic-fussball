const Sequelize = require('sequelize');
const database = require('../databaseConnection');

const StatHelper = require('../helpers/StatHelper')

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
  StatHelper.updateStatsForMatchPlayer(matchPlayer)
  return matchPlayer
});

MatchPlayer.afterCreate((matchPlayer, options) => {
  StatHelper.updateStatsForMatchPlayer(matchPlayer)
  return matchPlayer
});

MatchPlayer.afterDestroy((matchPlayer, options) => {
  StatHelper.updateStatsForMatchPlayer(matchPlayer)
  return matchPlayer
});

module.exports = MatchPlayer
