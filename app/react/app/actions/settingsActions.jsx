const SettingsActions = {
  PERIOD: 'PERIOD'
};

const period = (period) => {
  return {
    type: SettingsActions.PERIOD,
    period
  };
};

export { SettingsActions, period };
