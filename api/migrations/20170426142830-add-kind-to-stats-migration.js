'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'stats',
      'kind',
      {
        type: Sequelize.ENUM('overall', 'week', 'month'),
        allowNull: false,
        default: 'overall'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'stats',
      'kind'
    )
  }
};
