const MatchSerializer = require('serializers/MatchSerializer');
const User = require('models').User;
const Match = require('models').Match;
const MatchPlayer = require('models').MatchPlayer;

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
  // Validate home and away
  var homePlayers = ctx.request.body.match_players.filter((matchPlayer) => {
    return matchPlayer.homeTeam
  })
  var awayPlayers = ctx.request.body.match_players.filter((matchPlayer) => {
    return !matchPlayer.homeTeam
  })
  if (homePlayers.length === 0 || awayPlayers.length === 0) {
    ctx.throw(422, 'MISSING_HOME_OR_AWAY_PLAYERS')
  }

  // Check player duplicate
  var matchPlayerPlayerIds = ctx.request.body.match_players.map((match_player) => {
    return match_player.playerId
  })
  if (matchPlayerPlayerIds.length !== new Set(matchPlayerPlayerIds).size) {
    ctx.throw(422, 'PLAYER_ID_DUPLICATE')
  }

  // Validate if playerIds exist
  var players = await Player.findAll({attributes: ['id']})
  var playerIds = players.map((player) => {
    return player.id
  })

  for (var matchPlayerPlayerId of matchPlayerPlayerIds) {
    if (playerIds.indexOf(matchPlayerPlayerId) === -1) {
      ctx.throw(422, 'PLAYER_ID_NOT_FOUND')
    }
  }
  
  match = await Match.create(matchParams(ctx.request.body))

  // create match players
  for(var matchPlayer of ctx.request.body.match_players) {
    if (!matchPlayer.playerId) {
      continue;
    }
    
    var response = await MatchPlayer.create({
      matchId: match.id,
      playerId: matchPlayer.playerId,
      homeTeam: matchPlayer.homeTeam
    })
  }

  match = await match.reload({include: [MatchPlayer]})
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
