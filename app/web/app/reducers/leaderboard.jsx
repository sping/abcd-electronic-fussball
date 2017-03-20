import { Actions } from '../actions/myActions';

export default (state = { playerStats: [] }, action) => {
  switch (action.type) {
    case Actions.PLAYER_STATS:
      return {
        ...state,
        playerStats: action.stats
      };
    default:
      return state;
  }
}
