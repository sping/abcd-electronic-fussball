const Player = require('models').Player;
const User = require('models').User;
const MatchPlayer = require('models').MatchPlayer;
var PlayerHelper = function () {};

PlayerHelper.prototype.loadPlayer = async (ctx, next) => {
  player = await Player.findOne({
    where: {
      id: ctx.params.id
    },
    include: [User]
  })
  
  if (!player) ctx.throw(404)
  ctx.state.currentPlayer = player
  await next()
}

PlayerHelper.prototype.calculateStatsFromMatchPlayers = (matchPlayers) => {
  var wins = 0;
  var losses = 0;
  var goalsFor = 0;
  var goalsAgainst = 0;

  for (matchPlayer of matchPlayers) {
    if (matchPlayer.match.homeScore == 0 && matchPlayer.match.awayScore == 0) { continue }

    if (matchPlayer.homeTeam == matchPlayer.match.homeScore > matchPlayer.match.awayScore) {
      wins += 1
    } else {
      losses += 1
    }

    if (matchPlayer.homeTeam) {
      goalsFor += matchPlayer.match.homeScore;
      goalsAgainst += matchPlayer.match.awayScore;
    } else {
      goalsFor += matchPlayer.match.awayScore;
      goalsAgainst += matchPlayer.match.homeScore;
    }
  }
  
  let data = {
    playerId: player.id,
    user: player.user,
    wins: wins,
    losses: losses,
    winRatio: wins / (wins + losses) || 0,
    goalsFor: goalsFor,
    goalsAgainst: goalsAgainst,
    goalsDiff: goalsFor - goalsAgainst
  }

  return data
}

module.exports = new PlayerHelper();
