const Player = require('./../models').Player
const Match = require('./../models').Match
const MatchPlayer = require('./../models').MatchPlayer
const Stat = require('./../models').Stat
const moment = require('moment')

class StatHelper {
  static async resetStats ( ) {    
    const players = await Player.findAll({
      include: [Stat]
    })
    const availableAttributes = Stat.rawAttributes.kind.values

    for (let player of players) {
      let bulkArray = []
      for (let availableAttribute of availableAttributes) {
        bulkArray.push({kind: availableAttribute, playerId: player.id})
      }
      
      let playerStatIds = await player.getStats({
        attributes: ['id']
      })

      let stats = await Stat.bulkCreate(bulkArray)
      await StatHelper.updateStatsForPlayer(player.id)

      await player.removeStats(playerStatIds)
    }

    await Stat.destroy({
      where: {
        playerId: null
      }
    })
  }

  static async calculateAllStats ( ) {
    const players = await Player.findAll()
    
    for (let player of players) {
      let stats = await player.getStats()
      for (let stat of stats) {
        let matchPlayers = await player.getMatch_players({
          include: Match
        })
        await StatHelper.calculateStat(stat, matchPlayers)
      }
    }

    return true
  }

  static async updateStatsForPlayer (playerId) {
    var player = await Player.findOne({
      where: {
        id: playerId
      }
    })

    let playerMatchPlayers = await MatchPlayer.findAll({
      where: {
        playerId: playerId
      },
      include: [Match]
    })
    
    let stats = await player.getStats()
    for (let stat of stats) {
      await StatHelper.calculateStat(stat, playerMatchPlayers)
    }
    return true
  }

  static async updateStatsForMatchPlayer (matchPlayerId) {
    const matchPlayer = await MatchPlayer.findOne({
      where: {
        id: matchPlayerId
      },
      include: [Player]
    })
    
    var player = await matchPlayer.getPlayer()

    let playerMatchPlayers = await MatchPlayer.findAll({
      where: {
        playerId: matchPlayer.playerId
      },
      include: [Match]
    })
    
    let stats = await player.getStats()
    for (let stat of stats) {
      await StatHelper.calculateStat(stat, playerMatchPlayers)
    }
    return true
  }

  static async updateStatsForMatch (matchId) {
    const match = await Match.findOne({
      where: {
        id: matchId
      },
      include: [{
        model: MatchPlayer,
        include: [Player]
      }]
    })

    for (let matchPlayer of match.match_players) {
      let playerMatchPlayers = await MatchPlayer.findAll({
        where: {
          playerId: matchPlayer.playerId
        },
        include: [Match]
      })

      let stats = await matchPlayer.player.getStats()
      for (let stat of stats) {
        await StatHelper.calculateStat(stat, playerMatchPlayers)
      }
    }
    return true
  }

  static async calculateStat (stat, matchPlayers) {
    var wins = 0;
    var losses = 0;
    var goalsFor = 0;
    var goalsAgainst = 0;
    let startGuard = moment.utc(new Date(0))

    if (stat.kind === 'week' || stat.kind === 'month') {
      startGuard = moment.startOf(stat.kind)
    }

    for (let matchPlayer of matchPlayers) {      
      // guard for statkind
      if (moment(matchPlayer.match.playedAt) < startGuard) {
        continue
      }

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
  }
}

module.exports = StatHelper
