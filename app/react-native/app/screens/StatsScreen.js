import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView
} from 'react-native';

import {
  Card
} from 'react-native-elements'

import Constants from '../config/constants';
import Colors from '../config/colors';
import Player from '../models/player';

const GET_CURRENT_PLAYER_STATS_URI = Constants.BASE_URL + 'current_user/stats';

class StatsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerStats: {},
      pic: {
        uri: "http://simpleicon.com/wp-content/uploads/football.png"
      }
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
      return (
          <ScrollView style={styles.container}>
            <View>
              <View style={styles.imageContainer}>
                  <Image source={this.state.pic} style={styles.theimage} />
              </View>
              <Card style={styles.contentview}>
                  <View style={styles.item}>
                    <Text style={styles.text}>Ranking</Text>
                    <Text style={styles.text}>{this.state.playerStats.ranking}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.text}>Win ratio</Text>
                    <Text style={styles.text}>{this.state.playerStats.gameRatio}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.text}>Wins</Text>
                    <Text style={styles.text}>{this.state.playerStats.gamesWon}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.text}>Fails</Text>
                    <Text style={styles.text}>{this.state.playerStats.gamesLost}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.text}>Goals for</Text>
                    <Text style={styles.text}>{this.state.playerStats.goalsFor}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.text}>Goals against</Text>
                    <Text style={styles.text}>{this.state.playerStats.goalsAgainst}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.text}>Goals diff</Text>
                    <Text style={styles.text}>{this.state.playerStats.goalsDiff}</Text>
                  </View>
              </Card>
            </View>
          </ScrollView>
      );
  }

  fetchData() {
    var headers = new Headers();
    headers.append("Authorization", "Token token=" + Constants.API_TOKEN);

    fetch(GET_CURRENT_PLAYER_STATS_URI, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        var player = new Player(responseData.user);
        this.setState({
          playerStats: responseData.stat,
          player: player,
          pic: {
            uri: player.getPlayerImageUrl()
          }
        });
      })
      .done();
  }
}

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey6
  },
  imageContainer: {
    marginTop: 100,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  theimage: {
    flex: 0,
    width: 80,
    height: 80,
    borderRadius: 40
  },
  contentview: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20
  },
  text: {
    flex: 1,
    fontSize: 20
  }

});
