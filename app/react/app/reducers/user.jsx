import { UserActions } from '../actions/userActions';
const initialState = { currentUser: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case UserActions.CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case UserActions.USER_STATS_WEEK:
      return {
        ...state,
        weekStats: action.stats
      };
    case UserActions.USER_STATS_MONTH:
      return {
        ...state,
        monthStats: action.stats
      };
    case UserActions.USER_STATS_OVERALL  :
      return {
        ...state,
        overallStats: action.stats
      };
    default:
      return state;
  }
}
