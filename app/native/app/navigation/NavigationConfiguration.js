import {
  TabNavigator
} from 'react-navigation';

// Colors
import colors from '../config/colors';

// Tab-Navigators
import StatsScreen from '../screens/StatsScreen';
import AccountScreen from '../screens/AccountScreen';
import TimelineScreen from '../screens/TimelineScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';


const routeConfiguration = {
  Timeline:     { screen: TimelineScreen },
  Leaderboard:  { screen: LeaderboardScreen },
  Stats:        { screen: StatsScreen },
  Account:      { screen: AccountScreen },
}

const tabBarConfiguration = {
  swipeEnabled: false,
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    inactiveTintColor: colors.grey2,
    activeTintColor: colors.selectedTabColor,
  }
}

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration)

export const tabBarReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index: 0 }
  } else {
    return TabBar.router.getStateForAction(action, state);
  }
}
