const db = require('databaseConnection');

const scheme = {
  include: ['@all', 'user', 'stat'],
  exclude: ['@fk', '@auto'],
  assoc: {
    user: {
      exclude: ['password', 'apiToken', 'active', '@pk', '@fk', '@auto']
    },
    stat: {
      include: ['@all'],
      exclude: ['@pk', '@fk', '@auto']
    }
  }
};

module.exports = scheme
