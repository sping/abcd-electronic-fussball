var faker = require('faker');
const User = require('../../models').User
var UserFactory = function () {};

var params = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.image.imageUrl(),
    email: faker.internet.email(),
    password: 'testtest',
    apiToken: 'testtest',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

UserFactory.prototype.userParams = () => {
  return params()
}

UserFactory.prototype.create = async () => {
  var user = await User.create(params())
  return user
}

module.exports = new UserFactory();
