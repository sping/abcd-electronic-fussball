const UserActions = {
  CURRENT_USER: 'CURRENT_USER',
  USER_STATS_WEEK: 'USER_STATS_WEEK',
  USER_STATS_MONTH: 'USER_STATS_MONTH',
  USER_STATS_OVERALL: 'USER_STATS_OVERALL'
};

const currentUser = (user) => {
  return {
    type: UserActions.CURRENT_USER,
    user
  };
};

const userStatsWeek = (stats) => {
  return {
    type: UserActions.USER_STATS_WEEK,
    stats
  };
};

const userStatsMonth = (stats) => {
  return {
    type: UserActions.USER_STATS_MONTH,
    stats
  };
};

const userStatsOverall = (stats) => {
  return {
    type: UserActions.USER_STATS_OVERALL,
    stats
  };
};

export { UserActions, currentUser, userStatsWeek, userStatsMonth, userStatsOverall };
