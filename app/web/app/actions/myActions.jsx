const Actions = {
  DO_INCREMENT: 'DO_INCREMENT',
  DO_DECREMENT: 'DO_DECREMENT',
  PLAYER_STATS: 'PLAYER_STATS'
};

const increment = (number) => {
  return {
    type: Actions.DO_INCREMENT,
    number
  };
};

const decrement = (number) => {
  return {
    type: Actions.DO_DECREMENT,
    number
  };
};

const playerStats = (stats) => {
  return {
    type: Actions.PLAYER_STATS,
    stats
  };
};

export { Actions, increment, decrement, playerStats };
