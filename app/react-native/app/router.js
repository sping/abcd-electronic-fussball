import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    Router,
    Scene,
    Actions
} from 'react-native-router-flux';

import colors from './config/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StatsScreen from './screens/StatsScreen';
import LoginScreen from './screens/LoginScreen';
import AccountScreen from './screens/AccountScreen';
import TimelineScreen from './screens/TimelineScreen';
import LeaderBoardScreen from './screens/LeaderboardScreen';
import AddMatchScreen from './screens/AddMatchScreen';

// Simple component to render something in place of icon
const TabIcon = ({ selected, title, iconName }) => {
  return (
    <Text>
      <MaterialIcons name={iconName} size={26} color={selected ? colors.grey2 : colors.selectedTabColor}/>
    </Text>
  );
};

const defaultScene = Actions.create(
  <Scene key="root">

    <Scene key="Login" component={LoginScreen} hideNavBar/>
    <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor: '#FAFAFA'}}>
      {/* Timeline scene */}
      <Scene key="timelineScene" title="Timeline" iconName='home' icon={TabIcon}>
        <Scene key="timeline" component={TimelineScreen} title="Timeline" renderBackButton={()=>(null)} onRight={function(){
            console.log("Right button pressed");
            Actions.AddMatch();
          }}
          rightTitle="Toevoegen"/>
      </Scene>
      {/* Leaderboard scene */}
      <Scene key="leaderboardScene" title="LeaderBoard" iconName='format-list-numbered' icon={TabIcon}>
        <Scene key="leaderboard"  component={LeaderBoardScreen} title="LeaderBoard" renderBackButton={()=>(null)}/>
      </Scene>
      {/* Statistics scene */}
      <Scene key="statisticsScene" title="Statistics" iconName='equalizer' icon={TabIcon}>
        <Scene key="statistics" component={StatsScreen} title="Statistics" renderBackButton={()=>(null)}/>
      </Scene>
      {/* Account scene */}
      <Scene key="accountScene" title="Account" iconName='mood' icon={TabIcon}>
        <Scene key="account" component={AccountScreen} title="Account" renderBackButton={()=>(null)}/>
      </Scene>
    </Scene>
    <Scene key="AddMatch">
      <Scene key="AddMatchScreen" component={AddMatchScreen} leftTitle="<" title="Nieuwe wedstrijd"
      onLeft={function(){
            Actions.tabbar();
          }} />
    </Scene>
  </Scene>
)

class Routes extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Router scenes={defaultScene}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigationBarStyle: {
        backgroundColor: 'white',
        borderBottomColor: '#e1141d',
        paddingLeft: 20,
        paddingRight: 12,
        borderBottomWidth: 1,

    },
    titleStyle: {
        textAlign: 'left',
        fontSize: 22,
        alignSelf: 'auto',
        color: 'green',
    },
    rightButtonTextStyle: {
        color: '#011e31',
        fontSize: 16,
    },
});

export default Routes;
