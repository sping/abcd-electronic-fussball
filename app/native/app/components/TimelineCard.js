import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
} from 'react-native';

import {
  Card,
  Button
} from 'react-native-elements';

class TimelineCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <View style={styles.headerView}>
          <Text style={styles.time}>
            {this.props.time}
          </Text>
          <Text style={styles.date}>
            {this.props.date}
          </Text>
        </View>
        <View style={styles.scoreView}>
          <Text>
            {this.props.player1}
          </Text>
          <Text>
            {this.props.player2}
          </Text>
          <Text>
            {this.props.player3}
          </Text>
          <Text>
            {this.props.player4}
          </Text>
          <Text>
            {this.props.score}
          </Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    flexDirection: 'row',
  },
  time: {
    flex: 1,
  },
  date: {

  },
  scoreView: {

  }

})

export default TimelineCard;
