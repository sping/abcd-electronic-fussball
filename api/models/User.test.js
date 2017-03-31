const User = require('./index').User;
const UserFactory = require('../spec/factory/UserFactory')

beforeEach(async (done) => {
  const sequelize = require('../databaseConnection')
  await sequelize.sync({force: true})
  done()
})

test('User has player relation', () => {
  expect(Object.keys(User.associations).indexOf('player') > -1).toBeTruthy()
})

test('User without password', async () => {
  var params = Object.assign({}, UserFactory.userParams())
  delete params.password
  var user = await User.create(params)
  expect(user.password).toEqual(undefined)
  
})

test('User hashes', async () => {
  var params = UserFactory.userParams()
  var user = await User.create(params)
  expect(user.password).not.toEqual(params.password)
})
