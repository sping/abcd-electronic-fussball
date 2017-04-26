import { SettingsActions } from '../actions/settingsActions';

export default (state = { period: 'overall' }, action) => {
  switch (action.type) {
    case SettingsActions.PERIOD:
      return {
        ...state,
        period: action.period
      };
    default:
      return state;
  }
}
