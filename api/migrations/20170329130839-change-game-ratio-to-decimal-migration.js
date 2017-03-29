'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'stats',
      'gameRatio',
      {
        type: Sequelize.DECIMAL(20,8)
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'stats',
      'gameRatio',
      Sequelize.FLOAT
    )
  }
};
