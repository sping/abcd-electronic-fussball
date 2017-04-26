const db = require('../databaseConnection');

const scheme = {
  include: ['@all', 'user'],
  exclude: ['@auto'],
  assoc: {
    user: {
      exclude: ['password', 'apiToken', 'active', '@pk', '@fk', '@auto']
    }
  }
};

module.exports = scheme
