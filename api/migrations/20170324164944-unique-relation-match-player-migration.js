'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE `match_players` ADD UNIQUE `MatchPlayerUniqueIndex`(`playerId`, `matchId`)'
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE `match_players` DROP INDEX `MatchPlayerUniqueIndex`'
    );
  }
};
