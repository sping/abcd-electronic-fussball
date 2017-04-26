const db = require('../databaseConnection');

const scheme = {
  include: ['@all', 'user', 'stats'],
  exclude: ['@fk', '@auto'],
  assoc: {
    user: {
      exclude: ['password', 'apiToken', 'active', '@pk', '@fk', '@auto']
    },
    stats: {
      include: ['@all'],
      exclude: ['@pk', '@fk', '@auto']
    }
  }
};

module.exports = scheme
