import { TimelineActions } from '../actions/timelineActions';

export default (state = { matches: [] }, action) => {
  switch (action.type) {
    case TimelineActions.MATCHES:
      return {
        ...state,
        matches: action.matches
      };
    default:
      return state;
  }
}
