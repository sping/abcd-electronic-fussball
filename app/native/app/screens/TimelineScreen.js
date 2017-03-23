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
// import TimelineObject from '../models/timelineObject';
import Constants from '../config/constants';
import Colors from '../config/colors';
import { connect } from 'react-redux'

const GET_ALL_MATCHES = Constants.BASE_URL + 'matches';

const list = [
  {
    player1: 'David',
    player2: 'Brent',
    player3: 'Glenn',
    player4: 'Bing',
    time: '10:50',
    date: '15-03-2017',
    score: '10 vs 3',
  },
  {
    player1: 'Sebastiaan',
    player2: 'Jaap',
    player3: 'Jeroen',
    player4: 'Frits',
    time: '10:45',
    date: '15-03-2017',
    score: '5 vs 10',
  },
  {
    player1: 'Eric',
    player2: 'Jafeth',
    player3: 'Jeroen',
    player4: 'Erwin',
    time: '10:40',
    date: '15-03-2017',
    score: '5 vs 10',
  },
  {
    player1: 'Sebastiaan',
    player2: 'Jaap',
    player3: 'Jeroen',
    player4: 'Frits',
    time: '10:35',
    date: '15-03-2017',
    score: '1 vs 10',
  },
];


class TimelineScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLineCards: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var headers = new Headers();
    headers.append("Authorization", "Token token=" + this.props.apiToken);

    fetch(GET_ALL_MATCHES, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && responseData.message != 'Unauthorized') {
          for (obj in responseData) {
            console.log(obj);
          }
          this.setState({
            timeLineCards: responseData,
          });

        } else {
          console.log('ERROR');
        }

      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <List containerStyle={styles.list}>
          {
            list.map((item, index) => (
              <TimelineCard
                time={item.time}
                date={item.date}
                player1={item.player1}
                player2={item.player2}
                player3={item.player3}
                player4={item.player4}
                score={item.score}
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
    marginBottom: 40,
  },
  list: {
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = (state) => {
  return {
    apiToken: state.user.apiToken
  }
}

export default connect(mapStateToProps)(TimelineScreen);
