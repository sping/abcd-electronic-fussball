const db = require('databaseConnection');

const scheme = {
  include: ['@all', '@assoc'],
  exclude: ['userId', '@auto'],
  assoc: {
    matchPlayer: {
      include: ['@all', '@assoc'],
      exclude: ['userId', '@auto']
    }
  }
};

module.exports = scheme
