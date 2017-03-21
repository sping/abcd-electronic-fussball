import { TitlebarActions } from '../actions/titlebarActions';
const initialState = { title: 'Fussball' }

export default (state = initialState, action) => {
  switch (action.type) {
    case TitlebarActions.SET_TITLE:
      return {
        ...state,
        title: action.title
      };
    case TitlebarActions.RESET_TITLE:
      return initialState;
    default:
      return state;
  }
}
