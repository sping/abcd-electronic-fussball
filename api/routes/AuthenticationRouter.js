const AuthenticationHelper = require('helpers/AuthenticationHelper');
const AuthenticationController = require('controllers/AuthenticationController');
const Router = require('koa-router');
var AuthenticationRouter = new Router(
  {
    prefix: '/api/v1'
  }
);

AuthenticationRouter.post('/signup', AuthenticationController.signUp)
AuthenticationRouter.post('/login', AuthenticationController.login)

AuthenticationRouter.use('/', AuthenticationHelper.authenticate)
AuthenticationRouter.get('/current_user', AuthenticationController.getCurrentUser)
AuthenticationRouter.put('/current_user', AuthenticationController.updateCurrentUser)
AuthenticationRouter.get('/current_user/stats', AuthenticationController.calculateStatsForUser)
AuthenticationRouter.post('/logout', AuthenticationController.logout)

module.exports = AuthenticationRouter
