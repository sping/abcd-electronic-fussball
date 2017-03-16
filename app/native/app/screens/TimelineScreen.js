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

import TimelineCard from '../components/TimelineCard';

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
  }
];


class TimelineScreen extends Component {
  render() {
      return (
        <ScrollView>
          <List>
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
      );
  }
}

export default TimelineScreen;