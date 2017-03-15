const Player = require('models').Player;
var PlayerHelper = function () {};

PlayerHelper.prototype.loadPlayer = async (ctx, next) => {
  player = await Player.findOne({
    where: {
      id: ctx.params.id
    }
  })
  
  if (!player) ctx.throw(404)
  ctx.state.currentPlayer = player
  await next()
}

module.exports = new PlayerHelper();
