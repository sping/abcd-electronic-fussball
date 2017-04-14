import { UserActions } from '../actions/userActions';
const initialState = { currentUser: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case UserActions.CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case UserActions.STATS:
      return {
        ...state,
        userStats: action.stats
      };
    default:
      return state;
  }
}
