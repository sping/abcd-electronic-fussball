import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

import { List, ListItem } from 'react-native-elements'

class StatsScreen extends Component {
  render() {
    let pic = {
      uri: 'http://kingofwallpapers.com/fussball/fussball-005.jpg'
    }
      return (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={pic} style={styles.theimage} />
            </View>
            <View style={styles.contentview}>
              <View style={styles.item}>
                <Text style={styles.text}>Position</Text>
                <Text style={styles.text}>1</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Ratio</Text>
                <Text style={styles.text}>0.9</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Wins</Text>
                <Text style={styles.text}>9999</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Fails</Text>
                <Text style={styles.text}>0</Text>
              </View>
            </View>
          </View>
      );
  }
}

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  theimage: {
    flex: 0,
    width: 50,
    height: 50,
    borderRadius: 25
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
