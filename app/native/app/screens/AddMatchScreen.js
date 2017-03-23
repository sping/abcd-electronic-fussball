import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Picker,
    ScrollView
} from 'react-native';

import {
  Button,
  FormLabel,
  FormInput,
  CheckBox,

} from 'react-native-elements';
import Constants from '../config/constants';
import colors from '../config/colors';

const POST_MATCH_URL = Constants.BASE_URL + 'matches';
const FETCH_PLAYERS_URL = Constants.BASE_URL + 'players';

class AddMatchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      homePlayerId: String,
      awayPlayerId: String,
      homeScore: String,
      awayScore: String,
      playerItems: Array
    }
    this.state.homePlayerId = "";
    this.state.awayPlayerId = "";
    this.state.homeScore = "";
    this.state.awayScore = "";
    this.state.playerItems = []
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    fetch(FETCH_PLAYERS_URL, {
      method: 'GET',
      headers: {
        "Authorization": "Token token=" + Constants.API_TOKEN
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          playerItems: responseData
        });
      })
      .done();
  }

  postMatch() {
    fetch(POST_MATCH_URL, {
      method: 'POST',
      headers: {
        "Authorization": "Token token=" + Constants.API_TOKEN,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "kind": "SINGLE",
        "playedAt": new Date(),
        "homeScore": 1,
        "awayScore": 10,
        "notes": null
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        matchId = responseData.id;
        this.postPlayers(matchId);
      })
      .done();
  }

  postPlayers(matchId) {
    fetch(POST_MATCH_URL + matchId + '/setMatchPlayers', {
      method: "PUT",
      headers: {
        "Authorization": "Token token=" + Constants.API_TOKEN,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify([{
        "playerId": this.state.homePlayerId,
        "homeTeam": true
      },{
        "playerId": this.state.awayPlayerId,
        "homeTeam": false
      }])
    })
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        Alert.alert(
          'Nieuwe wedstrijd',
          'Succesvol aangemaakt!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      })
      .done();
  }

  formPostMatch() {
    // TODO: Do some checks
    this.postMatch();
  }

  render() {
        let playerItems = this.state.playerItems.map( (data) => {
            return <Picker.Item key={data.userId} value={data.userId} label={data.user.firstName} />
        });
      return (
        <ScrollView>
          <View style={styles.containerStyle}>
          <FormLabel containerStyle={styles.labelContainerStyle}>Thuis speler</FormLabel>
          <Picker
            style={styles.picker}
            selectedValue={this.state.homePlayerId}
            onValueChange={(id) => this.setState({homePlayerId: id})}>
            {playerItems}
          </Picker>
          <FormLabel containerStyle={styles.labelContainerStyle}>Uit speler</FormLabel>
          <Picker
            selectedValue={this.state.awayPlayerId}
            onValueChange={(id) => this.setState({awayPlayerId: id})}>
            {playerItems}
          </Picker>
          <FormLabel
            containerStyle={styles.labelContainerStyle}>Thuis score</FormLabel>
          <FormInput
            placeholder='Thuis score'
            onChangeText={(text) => this.setState({homeScore: text})}
            value={this.state.homeScore} />
          <FormLabel containerStyle={styles.labelContainerStyle}>Uit score</FormLabel>
          <FormInput
            placeholder='Uit score'
            onChangeText={(text) => this.setState({awayScore: text})}
            value={this.state.awayScore} />
          <Button
            buttonStyle={styles.button}
            backgroundColor={colors.green_500}
            onPress={() => this.formPostMatch()}
            title='Verzend wedstrijd' />
        </View>
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 60,
    flex: 1
  },
  button: {
    marginTop: 15,
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  animatedView: {
    alignItems: 'center'
  }
});

export default AddMatchScreen;
