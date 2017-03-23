const Actions = {
  DO_INCREMENT: 'DO_INCREMENT',
  DO_DECREMENT: 'DO_DECREMENT',
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

export { Actions, increment, decrement };
