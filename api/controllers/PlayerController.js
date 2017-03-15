const SequelizeToJson = require('sequelize-to-json');
const PlayerHelper = require('helpers/PlayerHelper');
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

PlayerController.prototype.calculateStatsForAllPlayers = async (ctx, next) => {
  var stats = [];

  var players = await Player.findAll({
    include: [{
      model: MatchPlayer,
      include: [Match]
    },
    {
      model: User
    }]
  })
  
  for (player of players) {   
    stats.push(PlayerHelper.calculateStatsFromMatchPlayers(player.match_players))
  }

  ctx.body = stats
}

PlayerController.prototype.calculateStatsForPlayer = async (ctx, next) => {
  var stats = [];

  var player = await Player.findOne({
    where: {
      id: ctx.params.id
    },
    include: [{
      model: MatchPlayer,
      include: [Match]
    },
    {
      model: User
    }]
  })

  var stats = PlayerHelper.calculateStatsFromMatchPlayers(player.match_players)
  ctx.body = stats
}

playerParams = (body) => {
  payload = {
  }

  Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
  return payload
}

module.exports = new PlayerController();
