const Sequelize = require('sequelize');
const PlayerHelper = require('../helpers/PlayerHelper');
const PlayerSerializer = require('../serializers/PlayerSerializer');
const Player = require('../models').Player;
const Stat = require('../models').Stat;

const MatchPlayer = require('../models').MatchPlayer;
const MatchSerializer = require('../serializers/MatchSerializer');
const PlayerStatSerializer = require('../serializers/PlayerStatSerializer');

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
  const statKind = ctx.query.period || 'overall'

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
        model: Stat,
        where: {
          kind: statKind
        },
        limit: 1
      }
    ]
  })
  serialisedPlayers = Player.serialize(players, PlayerStatSerializer);
  serialisedPlayers.sort((playerA, playerB) => {
    var a = playerA.stats[0];
    var b = playerB.stats[0];
    
    if (a.gameRatio === b.gameRatio) {
      if (a.wins === b.wins) {
        return b.goalsDiff - a.goalsDiff
      }
      return b.wins - a.wins
    }

    return b.gameRatio - a.gameRatio
  });

  serialisedPlayers.forEach((serialisedPlayer, index) => {
    serialisedPlayer.stats[0]['ranking'] = index + 1;
  });

  ctx.body = serialisedPlayers
}

PlayerController.prototype.getStatsForPlayer = async (ctx, next) => {
  const statKind = ctx.query.period || 'overall'

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
        model: Stat,
        where: {
          kind: statKind
        },
        limit: 1
      }
    ]
  })
  
  var ranking = await Stat.count({
    where: Sequelize.and(
       {
        kind: statKind
      },
      Sequelize.or(
        {
          gameRatio: {
            $gt: player.stats[0].gameRatio 
          }
        },
        Sequelize.and(
          {
            gameRatio: player.stats[0].gameRatio
          }, {
            gamesWon: {
              $gt: player.stats[0].gamesWon   
            }
          }
        ),
        Sequelize.and(
          {
            gameRatio: player.stats[0].gameRatio
          }, 
          {
            gamesWon: player.stats[0].gamesWon
          }, 
          {
            goalsDiff: {
              $gt: player.stats[0].goalsDiff   
            }
          }
        )
      )
    )
  })

  serialisedPlayer = player.serialize(PlayerStatSerializer);
  serialisedPlayer.stats[0]['ranking'] = ranking + 1;
  ctx.body = serialisedPlayer
}

module.exports = new PlayerController();
