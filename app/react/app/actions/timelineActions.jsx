const TimelineActions = {
  MATCHES: 'MATCHES'
};

const matches = (matches) => {
  return {
    type: TimelineActions.MATCHES,
    matches
  };
};

export { TimelineActions, matches };
