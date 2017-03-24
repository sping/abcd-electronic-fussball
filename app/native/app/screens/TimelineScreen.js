import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

import {
  List,
} from 'react-native-elements';

import {
  apiToken
} from '../actions/userActions';

import TimelineCard from '../components/TimelineCard';
import TimelineObject from '../models/timelineObject';
import Constants from '../config/constants';
import Colors from '../config/colors';
import { connect } from 'react-redux'

const GET_ALL_MATCHES = Constants.BASE_URL + 'matches';

class TimelineScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLineCards: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var headers = new Headers();
    headers.append("Authorization", "Token token=" + Constants.API_TOKEN);

    fetch(GET_ALL_MATCHES, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData && responseData.message != 'Unauthorized') {
          this.setState({
            timeLineCards: responseData
          });
        } else {
          console.log('ERROR');
        }
      })
      .done();
  }

  timeFromDateTime(date) {
    return new Date(date).toLocaleTimeString();
  }

  dateFromDateTime(date) {
    return new Date(date).toLocaleDateString();
  }

  getPlayer(index, players) {
    if (players.length == 2) {
      if (index == 1) {
        return ""
      } else if(index == 2) {
        index = 1
      }
    }

    if (players[index]) {
      players = players.sort((function(index){
          return function(a, b){
              return (a[index] === b[index] ? 0 : (a[index].homeTeam < b[index].homeTeam ? -1 : 1));
          };
      }));
      return players[index].player.user.firstName
    }
    return ""
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <List containerStyle={styles.list}>
          {
            this.state.timeLineCards.map((item, index) => (

              <TimelineCard
                time={this.timeFromDateTime(item.playedAt)}
                date={this.dateFromDateTime(item.playedAt)}
                score={item.homeScore + " vs " + item.awayScore}
                player1={this.getPlayer(0, item.match_players)}
                player2={this.getPlayer(1, item.match_players)}
                player3={this.getPlayer(2, item.match_players)}
                player4={this.getPlayer(3, item.match_players)}
                key={index}
              />
            ))
          }
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey6,
    marginTop: 40,
    marginBottom: 50,
  },
  list: {
    backgroundColor: 'transparent',
    marginBottom: 10
  }
})

const mapStateToProps = (state) => {
  return {
    apiToken: state.user.apiToken
  }
}

export default connect(mapStateToProps)(TimelineScreen);
