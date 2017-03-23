const Sequelize = require('sequelize');
const PlayerHelper = require('helpers/PlayerHelper');
const PlayerSerializer = require('serializers/PlayerSerializer');
const Player = require('models').Player;
const Stat = require('models').Stat;

const MatchPlayer = require('models').MatchPlayer;
const MatchSerializer = require('serializers/MatchSerializer');
const PlayerStatSerializer = require('serializers/PlayerStatSerializer');

var PlayerController = function () {};

PlayerController.prototype.getPlayer = async (ctx, next) => {
  ctx.body = ctx.state.currentPlayer.serialize(PlayerSerializer)
}

PlayerController.prototype.getPlayers = async (ctx, next) => {
  var players = await Player.findAll({
    include: [User]
  })
  ctx.body = Player.serialize(players, PlayerSerializer)
}

PlayerController.prototype.getMatches = async (ctx, next) => {
  var matches = await ctx.state.currentPlayer.getMatches()
  ctx.body = Match.serialize(matches, MatchSerializer)
}

PlayerController.prototype.calculateStatsForAllPlayers = async (ctx, next) => {
  var stats = [];

  var players = await Player.findAll({
    include: [
      {
        model: MatchPlayer,
        include: [Match]
      },
      {
        model: User
      },
      {
        model: Stat
      }
    ]
  })

  serialisedPlayers = Player.serialize(players, PlayerStatSerializer);
  serialisedPlayers.sort((playerA, playerB) => {
    var a = playerA.stat;
    var b = playerB.stat;
    
    if (a.gameRatio === b.gameRatio) {
      if (a.wins === b.wins) {
        return b.goalsDiff - a.goalsDiff
      }
      return b.wins - a.wins
    }

    return b.gameRatio - a.gameRatio
  });

  serialisedPlayers.forEach((serialisedPlayer, index) => {
    serialisedPlayer.stat['ranking'] = index + 1;
  });

  ctx.body = serialisedPlayers
}

PlayerController.prototype.getStatsForPlayer = async (ctx, next) => {
  var player = await Player.findOne({
    where: {
      id: ctx.params.id
    },
    include: [
      {
        model: MatchPlayer,
        include: [Match]
      },
      {
        model: User
      },
      {
        model: Stat
      }
    ]
  })
  
  var ranking = await Stat.count({
    where: Sequelize.or(
      {
        gameRatio: {
          $gt: player.stat.gameRatio 
        }
      },
      Sequelize.and(
        {
          gameRatio: player.stat.gameRatio
        }, {
          gamesWon: {
            $gt: player.stat.gamesWon   
          }
        }
      ),
      Sequelize.and(
        {
          gameRatio: player.stat.gameRatio
        }, 
        {
          gamesWon: player.stat.gamesWon
        }, 
        {
          goalsDiff: {
            $gt: player.stat.goalsDiff   
          }
        }
      )
    )
  })

  serialisedPlayer = player.serialize(PlayerStatSerializer);
  serialisedPlayer.stat['ranking'] = ranking + 1;
  ctx.body = serialisedPlayer
}

playerParams = (body) => {
  payload = {
  }

  Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
  return payload
}

module.exports = new PlayerController();
