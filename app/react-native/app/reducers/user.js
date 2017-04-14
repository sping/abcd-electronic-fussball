import { UserActions } from '../actions/userActions';

export default reducer = (state = {
    firstName: '',
    lastName: '',
    avatarUrl: '',
    email: '',
    apiToken: ''
}, action) => {
  switch (action.type) {
    case UserActions.FIRST_NAME:
      return {
        ...state,
        firstName: action.firstName
      };

    case UserActions.LAST_NAME:
      return {
        ...state,
        lastName: action.lastName
      };

    case UserActions.AVATAR_URL:
      return {
        ...state,
        avatarUrl: action.avatarUrl
      };

    case UserActions.EMAIL:
      return {
        ...state,
        email: action.email
      };

    case UserActions.API_TOKEN:
      return {
        ...state,
        apiToken: action.apiToken
      };

    default:
      return state;
    }

}
