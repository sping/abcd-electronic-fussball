const UserSerializer = require('serializers/UserSerializer');
const User = require('models').User;
const Match = require('models').Match;
const MatchPlayer = require('models').MatchPlayer;
const PlayerHelper = require('helpers/PlayerHelper');

var AuthenticationController = function () {};

AuthenticationController.prototype.getCurrentUser = async (ctx, next) => {
  ctx.body = ctx.state.currentUser.serialize(UserSerializer)
}

AuthenticationController.prototype.updateCurrentUser = async (ctx, next) => { 
  var user = await ctx.state.currentUser.update(userParams(ctx.request.body))
  ctx.body = user.serialize(UserSerializer)
}

AuthenticationController.prototype.signUp = async (ctx, next) => {
  var user = await User.create(userParams(ctx.request.body))
  if (!user) ctx.throw(404)
  ctx.body = user.serialize(UserSerializer)
}

AuthenticationController.prototype.login = async (ctx, next) => {
  if (!ctx.request.body.email || !ctx.request.body.password) ctx.throw(422)

  var user = await User.findOne({
    where: {
      email: ctx.request.body.email,
      password: User.convertPasswordToHash(ctx.request.body.password)
    }
  })

  if (!user) {
    ctx.throw(404)
  }

  user = await user.update({
    apiToken: null,
    active: true
  })

  if (!user) ctx.throw(401)
  ctx.body = user.serialize(UserSerializer)
}

AuthenticationController.prototype.calculateStatsForUser = async (ctx, next) => {
  player = await ctx.state.currentUser.getPlayer({
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

AuthenticationController.prototype.logout = async (ctx, next) => {
  var user = await ctx.state.currentUser.update({
    apiToken: null,
    active: false
  });
  ctx.status = 204
}


userParams = (body) => {
  payload = {
    firstName: body.firstName,
    lastName: body.lastName,
    avatarUrl: body.avatarUrl,
    email: body.email,
    password: body.password,
    active: true
  }

  Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
  return payload
}

module.exports = new AuthenticationController();
