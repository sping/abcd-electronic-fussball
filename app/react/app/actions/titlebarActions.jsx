const TitlebarActions = {
  SET_TITLE: 'SET_TITLE',
  RESET_TITLE: 'RESET_TITLE'
};

const setTitle = (title) => {
  return {
    type: TitlebarActions.SET_TITLE,
    title
  };
};

const resetTitle = () => {
  return {
    type: TitlebarActions.RESET_TITLE,
    null
  };
};

export { TitlebarActions, setTitle, resetTitle };
