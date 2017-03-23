var StatHelper = function () {};

var updateStatForMatchPlayers = async (stat, matchPlayers) => {
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

  var ratio = wins / (wins + losses) || 0;
  var goalsDiff = goalsFor - goalsAgainst;
  var stat = await stat.update(
    {
      gamesWon: wins,
      gamesLost: losses,
      goalsFor: goalsFor,
      goalsAgainst: goalsAgainst,
      goalsDiff: goalsDiff,
      gameRatio: ratio
    }
  )

  return stat
}

StatHelper.prototype.updateStatsForMatch = async (match) => {
  // FIXME: This is stupid, but it's needed?
  const MatchPlayer = require('models').MatchPlayer
  const Match = require('models').Match

  for (let matchPlayer of match.match_players) {
    let playerMatchPlayers = await MatchPlayer.findAll({
      where: {
        playerId: matchPlayer.playerId
      },
      include: [Match]
    })
    let playerStat = await matchPlayer.player.getStat()
    var stat = await updateStatForMatchPlayers(playerStat, playerMatchPlayers)
  }
  return stat
}

StatHelper.prototype.updateStatsForMatchPlayer = async (matchPlayer) => {
  // FIXME: This is stupid, but it's needed?
  const MatchPlayer = require('models').MatchPlayer
  const Match = require('models').Match
  var player = await matchPlayer.getPlayer();

  let playerMatchPlayers = await MatchPlayer.findAll({
    where: {
      playerId: matchPlayer.playerId
    },
    include: [Match]
  })
  let playerStat = await player.getStat()
  var stat = await updateStatForMatchPlayers(playerStat, playerMatchPlayers)
  return stat
}


module.exports = new StatHelper();
