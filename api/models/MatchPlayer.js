const Sequelize = require('sequelize');
const database = require('databaseConnection');

MatchUser = database.define('match_players',
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
  });

module.exports = MatchUser
