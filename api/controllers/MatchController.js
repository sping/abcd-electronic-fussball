const SequelizeToJson = require('sequelize-to-json');
const MatchSerializer = require('serializers/MatchSerializer');
const Match = require('models').Match;
const MatchPlayer = require('models').MatchPlayer;
const SequelizeTokenify = require('sequelize-tokenify');
const serializer = new SequelizeToJson(Match, MatchSerializer);

var MatchController = function () {};

MatchController.prototype.getMatch = async (ctx, next) => {
  ctx.body = ctx.state.currentMatch
  // ctx.body = serializer.serialize(ctx.state.currentMatch)
}

MatchController.prototype.getMatches = async (ctx, next) => {
  var matches = await ctx.state.currentUser.getMatches()
  // ctx.body = SequelizeToJson.serializeMany(matches, Match, MatchSerializer)
  ctx.body = matches
}

MatchController.prototype.createMatch = async (ctx, next) => {
  match = await ctx.state.currentUser.createMatch(matchParams(ctx.request.body))
  // ctx.body = serializer.serialize(match)
  ctx.body = match
}

MatchController.prototype.updateMatch = async (ctx, next) => {
  match = await ctx.state.currentMatch.update(matchParams(ctx.request.body))
  // ctx.body = serializer.serialize(match)
  ctx.body = match
}

MatchController.prototype.setMatchPlayers = async (ctx, next) => {
  await MatchPlayer.destroy({
    where: {
      matchId: ctx.state.currentMatch.id
    }
  })

  for (matchPlayer of ctx.request.body) {
    await MatchPlayer.create({
      matchId: ctx.state.currentMatch.id,
      playerId: matchPlayer.playerId,
      homeTeam: matchPlayer.homeTeam
    })
  }
  
  match = await ctx.state.currentMatch.get()
  ctx.body = match
}

MatchController.prototype.destroyMatch = async (ctx, next) => {
  await ctx.state.currentMatch.destroy()
  ctx.status = 204
}

matchParams = (body) => {
  payload = {
    kind: body.kind,
    playedAt: body.playedAt,
    homeScore: body.homeScore,
    awayScore: body.awayScore,
    notes: body.notes
  }

  Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
  return payload
}

module.exports = new MatchController();