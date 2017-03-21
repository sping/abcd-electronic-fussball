const LeaderboardActions = {
  PLAYER_STATS: 'PLAYER_STATS'
};

const playerStats = (stats) => {
  return {
    type: LeaderboardActions.PLAYER_STATS,
    stats
  };
};

export { LeaderboardActions, playerStats };
