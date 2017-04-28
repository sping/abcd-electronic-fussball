const SettingsActions = {
  LEADERBOARD_PERIOD: 'LEADERBOARD_PERIOD',
  MYSTATS_PERIOD: 'MYSTATS_PERIOD'
};

const leaderboardPeriod = (leaderboardPeriod) => {
  return {
    type: SettingsActions.LEADERBOARD_PERIOD,
    leaderboardPeriod
  };
};

const mystatsPeriod = (mystatsPeriod) => {
  return {
    type: SettingsActions.MYSTATS_PERIOD,
    mystatsPeriod
  };
};

export { SettingsActions, leaderboardPeriod, mystatsPeriod };
