const User = require('models/User.js');
const Match = require('models/Match.js');
const Player = require('models/Player.js');
const MatchPlayer = require('models/MatchPlayer.js');
const Stat = require('models/Stat.js');

Player.belongsTo(User);
User.hasOne(Player, {onDelete: 'cascade', hooks: true});

MatchPlayer.belongsTo(Player);
Player.hasMany(MatchPlayer, {onDelete: 'cascade', hooks: true});

MatchPlayer.belongsTo(Match);
Match.hasMany(MatchPlayer, {onDelete: 'cascade', hooks: true});

Player.belongsToMany(Match, {through: 'match_players'});
Match.belongsToMany(Player, {through: 'match_players'});

Stat.belongsTo(Player);
Player.hasOne(Stat, {onDelete: 'cascade'});

module.exports = {
  User: User,
  Match: Match,
  Player: Player,
  MatchPlayer: MatchPlayer,
  Stat: Stat
}
