const LeaderboardActions = {
  PLAYER_STATS_WEEK: 'PLAYER_STATS_WEEK',
  PLAYER_STATS_MONTH: 'PLAYER_STATS_MONTH',
  PLAYER_STATS_OVERALL: 'PLAYER_STATS_OVERALL'
};

const playerStatsWeek = (stats) => {
  return {
    type: LeaderboardActions.PLAYER_STATS_WEEK,
    stats
  };
};

const playerStatsMonth = (stats) => {
  return {
    type: LeaderboardActions.PLAYER_STATS_MONTH,
    stats
  };
};

const playerStatsOverall = (stats) => {
  return {
    type: LeaderboardActions.PLAYER_STATS_OVERALL,
    stats
  };
};

export { LeaderboardActions, playerStatsWeek, playerStatsMonth, playerStatsOverall };
