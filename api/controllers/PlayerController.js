const SequelizeToJson = require('sequelize-to-json');
const PlayerSerializer = require('serializers/PlayerSerializer');
const Player = require('models').Player;
const Model = require('models').Model;
const serializer = new SequelizeToJson(Player, PlayerSerializer);

const MatchPlayer = require('models').MatchPlayer;
const MatchSerializer = require('serializers/MatchSerializer');

var PlayerController = function () {};

PlayerController.prototype.getPlayer = async (ctx, next) => {
  // ctx.body = serializer.serialize(ctx.state.currentPlayer)
  ctx.body = ctx.state.currentPlayer
}

PlayerController.prototype.getPlayers = async (ctx, next) => {
  var players = await Player.findAll({
    include: [User]
  })
  // ctx.body = SequelizeToJson.serializeMany(players, Player, PlayerSerializer)
  ctx.body = players
}

PlayerController.prototype.getMatches = async (ctx, next) => {
  var matches = await ctx.state.currentPlayer.getMatches()
  ctx.body = matches
  // ctx.body = SequelizeToJson.serializeMany(matches, Match, MatchSerializer)
}

playerParams = (body) => {
  payload = {
  }

  Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
  return payload
}

module.exports = new PlayerController();
