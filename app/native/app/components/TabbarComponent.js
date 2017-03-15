import React, { Component } from 'react';
import {
  Tabs,
  Tab,
} from 'react-native-elements';

import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatsScreen from '../screens/StatsScreen';
import AccountScreen from '../screens/AccountScreen';
import TimelineScreen from '../screens/TimelineScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

class TabbarComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'timeline'
    }
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab (selectedTab) {
    this.setState({
      selectedTab
    })
  }

  render() {

    const { selectedTab } = this.state

    return (
      <Tabs>
        <Tab
          selected={selectedTab === 'timeline'}
          title='Timeline'
          renderIcon={() => <Icon color={colors.grey2} name='home' size={26} />}
          renderSelectedIcon={() => <Icon color={colors.selectedTabColor} name='home' size={26} />}
          onPress={() => this.changeTab('timeline')}>
          <TimelineScreen />
        </Tab>
        <Tab
          selected={selectedTab === 'leaderboard'}
          title="Leaderboard"
          renderIcon={() => <Icon color={colors.grey2} name='language' size={26} />}
          renderSelectedIcon={() => <Icon color={colors.selectedTabColor} name='language' size={26} />}
          onPress={() => this.changeTab('leaderboard')}>
          <LeaderboardScreen />
        </Tab>
        <Tab
          selected={selectedTab === 'stats'}
          title="Stats"
          renderIcon={() => <Icon color={colors.grey2} name='update' size={26} />}
          renderSelectedIcon={() => <Icon color={colors.selectedTabColor} name='update' size={26} />}
          onPress={() => this.changeTab('stats')}>
          <StatsScreen />
        </Tab>
        <Tab
          selected={selectedTab === 'account'}
          title="Account"
          renderIcon={() => <Icon color={colors.grey2} name='location-on' size={26} />}
          renderSelectedIcon={() => <Icon color={colors.selectedTabColor} name='location-on' size={26} />}
          onPress={() => this.changeTab('account')}>
          <AccountScreen />
        </Tab>
      </Tabs>
    )
  }
}

export default TabbarComponent;
