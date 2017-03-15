const SequelizeToJson = require('sequelize-to-json');
const PlayerSerializer = require('serializers/PlayerSerializer');
const Player = require('models').Player;
const serializer = new SequelizeToJson(Player, PlayerSerializer);

const MatchPlayer = require('models').MatchPlayer;
const MatchSerializer = require('serializers/MatchSerializer');

var PlayerController = function () {};

PlayerController.prototype.getPlayer = async (ctx, next) => {
  // ctx.body = serializer.serialize(ctx.state.currentPlayer)
  ctx.body = ctx.state.currentPlayer
}

PlayerController.prototype.getPlayers = async (ctx, next) => {
  var players = await ctx.state.currentUser.getPlayers()
  // ctx.body = SequelizeToJson.serializeMany(players, Player, PlayerSerializer)
  ctx.body = players
}

PlayerController.prototype.createPlayer = async (ctx, next) => {
  player = await ctx.state.currentUser.createPlayer(playerParams(ctx.request.body))
  ctx.body = player
  // ctx.body = serializer.serialize(player)
}

PlayerController.prototype.updatePlayer = async (ctx, next) => {
  player = await ctx.state.currentPlayer.update(playerParams(ctx.request.body))
  ctx.body = player
  // ctx.body = serializer.serialize(player)
}

PlayerController.prototype.destroyPlayer = async (ctx, next) => {
  await ctx.state.currentPlayer.destroy()
  ctx.status = 204
}

PlayerController.prototype.getMatches = async (ctx, next) => {
  var matches = await ctx.state.currentPlayer.getMatches()
  ctx.body = matches
  // ctx.body = SequelizeToJson.serializeMany(matches, Match, MatchSerializer)
}

playerParams = (body) => {
  payload = {
    firstName: body.firstName,
    lastName: body.lastName
  }

  Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
  return payload
}

module.exports = new PlayerController();
