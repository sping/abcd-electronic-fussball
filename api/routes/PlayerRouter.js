const AuthenticationHelper = require('helpers/AuthenticationHelper');
const PlayerHelper = require('helpers/PlayerHelper');
const PlayerController = require('controllers/PlayerController');
const Router = require('koa-router');
var PlayerRouter = new Router(
  {
    prefix: '/api/v1/players'
  }
);

PlayerRouter.use('/', AuthenticationHelper.authenticate)
PlayerRouter.get('/', PlayerController.getPlayers)
PlayerRouter.post('/', PlayerController.createPlayer)

PlayerRouter.use('/:id', PlayerHelper.loadPlayer)
PlayerRouter.get('/:id', PlayerController.getPlayer)
PlayerRouter.put('/:id', PlayerController.updatePlayer)
PlayerRouter.delete('/:id', PlayerController.destroyPlayer)
PlayerRouter.get('/:id/matches', PlayerController.getMatches)

module.exports = PlayerRouter
