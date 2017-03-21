const UserActions = {
  CURRENT_USER: 'CURRENT_USER'
};

const currentUser = (user) => {
  return {
    type: UserActions.CURRENT_USER,
    user
  };
};

export { UserActions, currentUser };
