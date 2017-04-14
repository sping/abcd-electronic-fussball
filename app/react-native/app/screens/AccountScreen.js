import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';

import {
  Button,
  FormLabel,
  FormInput,
  CheckBox
} from 'react-native-elements';
import Avatar from 'react-native-interactive-avatar';
import Constants from '../config/constants';
import colors from '../config/colors';
import Player from '../models/player';
import { Actions } from 'react-native-router-flux';

const LOGOUT_URL = Constants.BASE_URL + 'logout';
const GET_CURRENT_PLAYER_URL = Constants.BASE_URL + 'current_user';

class AccountScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: String,
      lastName: String,
      avatarUrl: String,
      player: {}
    }
    this.state.firstName = "";
    this.state.lastName = "";
    this.state.avatarUrl = "";
  }

  componentDidMount() {
    this.fetchCurrentPlayer();
  }

  fetchCurrentPlayer() {
    var headers = new Headers();
    headers.append("Authorization", "Token token=" + Constants.API_TOKEN);

    fetch(GET_CURRENT_PLAYER_URL, {
      headers: headers
    })
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        var player = new Player(responseData);
        this.setState({
          player: player,
          firstName: player.firstName,
          lastName: player.lastName,
          avatarUrl: player.avatarUrl
        });
      })
      .done();
  }

  updateAccount() {

    fetch(GET_CURRENT_PLAYER_URL, {
      method: 'PUT',
      headers: {
        "Authorization": "Token token=" + Constants.API_TOKEN,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        avatarUrl: this.state.avatarUrl
      })
    })
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        var player = new Player(responseData);
        this.setState({
          player: player,
          firstName: player.firstName,
          lastName: player.lastName,
          avatarUrl: player.avatarUrl
        });
        Alert.alert(
          'Account aanpassingen',
          'Succesvol doorgevoerd!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      })
      .done();
  }

  logout() {
      fetch(LOGOUT_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Token token=" + Constants.API_TOKEN
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          Actions.pop();
        })
        .done( );
  }

  render() {
      return (
        <View style={styles.containerStyle}>
          <View style={styles.animatedView}>
            <Avatar
              uri={'https://media1.giphy.com/media/l3q2zbskZp2j8wniE/giphy.gif'}
              size={'default'}
              placeholderSource={require('../assets/images/avatar.png')}
              interactive
              onChange={this.handleImageChange}
              style={styles.animatedGif}
            />
          </View>
          <FormLabel
            containerStyle={styles.labelContainerStyle}>Voornaam</FormLabel>
          <FormInput
            placeholder='Voornaam'
            onChangeText={(text) => this.setState({firstName: text})}
            value={this.state.firstName} />
          <FormLabel containerStyle={styles.labelContainerStyle}>Achternaam</FormLabel>
          <FormInput
            placeholder='Achternaam'
            onChangeText={(text) => this.setState({lastName: text})}
            value={this.state.lastName} />
          <FormLabel containerStyle={styles.labelContainerStyle}>Avatar URL</FormLabel>
          <FormInput
            placeholder='http://images.askmen.com/top_10/entertainment/1271175585_top-10-douchebag-fashions_5.jpg'
            onChangeText={(text) => this.setState({avatarUrl: text})}
            value={this.state.avatarUrl} />
          <Button
            buttonStyle={styles.button}
            backgroundColor={colors.green_500}
            onPress={() => this.updateAccount()}
            title='Aanpassen' />
          <View>
            <Button
              buttonStyle={styles.button}
              backgroundColor={colors.red_500}
              onPress={() => this.logout()}
              title='Log out' />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    marginTop: 15
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  animatedView: {
    alignItems: 'center'
  }
});

export default AccountScreen;
