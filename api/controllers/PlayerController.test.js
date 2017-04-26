const PlayerController = require('./PlayerController')
const PlayerFactory = require('../spec/factory/PlayerFactory')
const PlayerSerializer = require('../serializers/PlayerSerializer');

const sequelize = require('../databaseConnection')

beforeEach(async (done) => {
  await sequelize.sync({force: true})
  done()
})

it('Gets the current player', async () => {
  var player = await PlayerFactory.create()
  var ctx = {
    state: {
      currentPlayer: player
    }
  }
  await PlayerController.getPlayer(ctx)
  expect(ctx.body).toEqual(player.serialize(PlayerSerializer))
});

describe('#getPlayers', async () => {
  it('Gets player', async () => {
    await PlayerFactory.create()
    await PlayerFactory.create()

    var ctx = { }
    await PlayerController.getPlayers(ctx)
    expect(ctx.body.length).toEqual(2)
  });
});
