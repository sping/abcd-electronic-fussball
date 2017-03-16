const MatchSerializer = require('serializers/MatchSerializer');
const User = require('models').User;
const Match = require('models').Match;
const MatchPlayer = require('models').MatchPlayer;
const SequelizeTokenify = require('sequelize-tokenify');

var MatchController = function () {};

MatchController.prototype.getMatch = async (ctx, next) => {
  ctx.body = ctx.state.currentMatch.serialize(MatchSerializer)
}

MatchController.prototype.getMatches = async (ctx, next) => {
  var matches = await Match.findAll({
    include: {
      model: MatchPlayer,
      include: [{
        model: Player,
        include: [User]
      }]
    },
    order: [
      ['playedAt', 'DESC']
    ]
  })
  ctx.body = Match.serialize(matches, MatchSerializer)
}

MatchController.prototype.createMatch = async (ctx, next) => {
  match = await Match.create(matchParams(ctx.request.body))
  ctx.body = match.serialize(MatchSerializer)
}

MatchController.prototype.updateMatch = async (ctx, next) => {
  match = await ctx.state.currentMatch.update(matchParams(ctx.request.body))
  ctx.body = match.serialize(MatchSerializer)
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
  
  match = await ctx.state.currentMatch.reload()
  ctx.body = match.serialize(MatchSerializer)
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
