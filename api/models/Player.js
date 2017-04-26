const Sequelize = require('sequelize');
const database = require('../databaseConnection');
const Stat = require('./Stat.js');
const User = require('./User.js');

Player = database.define('players',
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
    }
  });

Player.hook('afterCreate', async (player, options) => {
  Stat.bulkCreate([
    { kind: 'overall', playerId: player.id },
    { kind: 'week', playerId: player.id },
    { kind: 'month', playerId: player.id }
  ])
  return player
});

module.exports = Player
