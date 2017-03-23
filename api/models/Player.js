const Sequelize = require('sequelize');
const database = require('databaseConnection');

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
  await player.createStat()
  return player
});

module.exports = Player
