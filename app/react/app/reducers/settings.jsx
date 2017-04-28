import { SettingsActions } from '../actions/settingsActions';

export default (state = { leaderboardPeriod: 'overall', mystatsPeriod: 'overall' }, action) => {
  switch (action.type) {
    case SettingsActions.LEADERBOARD_PERIOD:
      return {
        ...state,
        leaderboardPeriod: action.leaderboardPeriod
      };
    case SettingsActions.MYSTATS_PERIOD:
      return {
        ...state,
        mystatsPeriod: action.mystatsPeriod
      };
    default:
      return state;
  }
}
