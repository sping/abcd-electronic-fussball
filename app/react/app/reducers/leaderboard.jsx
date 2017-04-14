import { LeaderboardActions } from '../actions/leaderboardActions';

export default (state = { playerStats: [] }, action) => {
  switch (action.type) {
    case LeaderboardActions.PLAYER_STATS:
      return {
        ...state,
        playerStats: action.stats
      };
    default:
      return state;
  }
}
