const User = require('models/User.js');
const Match = require('models/Match.js');
const Player = require('models/Player.js');
const MatchPlayer = require('models/MatchPlayer.js');

Player.belongsTo(User);
User.hasOne(Player, {onDelete: 'CASCADE'});

MatchPlayer.belongsTo(Player);
Player.hasMany(MatchPlayer, {onDelete: 'CASCADE'});

MatchPlayer.belongsTo(Match);
Match.hasMany(MatchPlayer, {onDelete: 'CASCADE'});

Player.belongsToMany(Match, {through: 'match_players'});
Match.belongsToMany(Player, {through: 'match_players'});

module.exports = {
  User: User,
  Match: Match,
  Player: Player,
  MatchPlayer: MatchPlayer
}
