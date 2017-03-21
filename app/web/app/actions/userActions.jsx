const UserActions = {
  CURRENT_USER: 'CURRENT_USER',
  STATS: 'STATS'
};

const currentUser = (user) => {
  return {
    type: UserActions.CURRENT_USER,
    user
  };
};

const userStats = (stats) => {
  return {
    type: UserActions.STATS,
    stats
  };
};

export { UserActions, currentUser, userStats };
