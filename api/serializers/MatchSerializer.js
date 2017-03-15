const db = require('databaseConnection');

const scheme = {
  include: ['@all', '@assoc'],
  exclude: ['@auto'],
  assoc: {
    matchPlayer: {
      include: ['@all', '@assoc'],
      exclude: ['@auto']
    }
  }
};

module.exports = scheme
