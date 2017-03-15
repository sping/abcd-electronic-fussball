require('app-module-path').addPath(__dirname);
const path      = require('path');
const constants = require('./config/constants');

const logger  = require('koa-logger');
const Router  = require('koa-router');
const koa     = require('koa');
const app     = module.exports = new koa();
const koaBody = require('koa-bodyparser');
const cors    = require('kcors');

const StatusRouter          = require('routes').StatusRouter;
const AuthenticationRouter  = require('routes').AuthenticationRouter;
const PlayerRouter          = require('routes').PlayerRouter;
const MatchRouter           = require('routes').MatchRouter;

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(logger());
app.use(koaBody({
  onerror: function (err, ctx) {
    ctx.throw('MALFORMED_REQUEST', 422);
  }
}));
app.use(cors())
app.use(StatusRouter.routes())
app.use(AuthenticationRouter.routes())
app.use(PlayerRouter.routes())
app.use(MatchRouter.routes())

if (!module.parent) {
  port = process.env.PORT || 5000;
  app.listen(port);
  console.log("Server running. Listening on port " + port + ".");
  console.log("Version: " + constants.version);
}
