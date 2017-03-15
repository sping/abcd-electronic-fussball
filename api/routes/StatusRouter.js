const Router = require('koa-router');
var StatusRouter = new Router();

StatusRouter.get('/status', async (ctx, next) => {
  ctx.body = {
    alive: true
  }
  ctx.status = 200
});

module.exports = StatusRouter
