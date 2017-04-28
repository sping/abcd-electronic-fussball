import { LeaderboardActions } from '../actions/leaderboardActions';

export default (state = { weekStats: [], monthStats: [], overallStats: [] }, action) => {
  switch (action.type) {
    case LeaderboardActions.PLAYER_STATS_WEEK:
      return {
        ...state,
        weekStats: action.stats
      };
    case LeaderboardActions.PLAYER_STATS_MONTH:
      return {
        ...state,
        monthStats: action.stats
      };
    case LeaderboardActions.PLAYER_STATS_OVERALL:
      return {
        ...state,
        overallStats: action.stats
      };
    default:
      return state;
  }
}
