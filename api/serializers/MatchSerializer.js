const db = require('../databaseConnection');

const scheme = {
  include: ['@all', 'match_players'],
  exclude: ['@auto', '@fk'],
  assoc: {
    match_players: {
      include: ['@all', 'player'],
      exclude: ['@auto', '@fk'],
      assoc: {
        player: {
          include: ['@all', 'user'],
          exclude: ['@auto', '@pk', '@fk'],
          assoc: {
            user: {
              exclude: ['password', 'apiToken', 'active', '@pk', '@fk', '@auto']
            }
          }
        }
      }
    }
  }
};

module.exports = scheme
