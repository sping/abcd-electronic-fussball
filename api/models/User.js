const Sequelize = require('sequelize');
const database = require('databaseConnection');
const SequelizeTokenify = require('sequelize-tokenify');
const env = require('config/env');
const crypto = require('crypto');

User = database.define('users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    avatarUrl: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: Sequelize.STRING,
    apiToken: {
      type: Sequelize.STRING,
      unique: true
    },
    active: {
      type: Sequelize.BOOLEAN
    },
  });

SequelizeTokenify.tokenify(User, {
  field: 'apiToken',
  length: '24'
});

User.hook('beforeCreate', (user, options) => {
  user.password = User.convertPasswordToHash(user.password);
  return user
});

User.hook('afterCreate', async (user, options) => {
  await user.createPlayer()
  return user
});

User.convertPasswordToHash = (password) => {
  if (!password) {
    return
  }
  return crypto.createHmac('sha256', env.secret).update(password).digest('hex');
}

module.exports = User
