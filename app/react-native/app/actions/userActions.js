const UserActions = {
  FIRST_NAME: 'FIRST_NAME',
  LAST_NAME: 'LAST_NAME',
  AVATAR_URL: 'AVATAR_URL',
  EMAIL: 'EMAIL',
  API_TOKEN: 'API_TOKEN'
};

const firstName = (firstName) => {
  return {
    type: UserActions.FIRST_NAME,
    firstName
  };
};

const lastName = (lastName) => {
  return {
    type: UserActions.LAST_NAME,
    lastName
  };
};

const avatarUrl = (avatarUrl) => {
  return {
    type: UserActions.AVATAR_URL,
    avatarUrl
  };
};

const email = (email) => {
  return {
    type: UserActions.EMAIL,
    email
  };
};

const apiToken = (apiToken) => {
  return {
    type: UserActions.API_TOKEN,
    apiToken
  };
};

export { UserActions, firstName, lastName, avatarUrl, email, apiToken };
