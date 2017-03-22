import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
  Button,
  FormLabel,
  FormInput,
  CheckBox,
} from 'react-native-elements';

import { Actions } from 'react-native-router-flux';
import colors from '../config/colors';
import TabbarComponent from '../components/TabbarComponent';
import TimelineScreen from './TimelineScreen';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: String,
      password: String,
      checked: Boolean,
    }
  }

  login() {
    console.log(this.state);
    Actions.Timeline();
  }

  remember() {
    let checked = this.state.checked;
    if (checked) {
      this.setState({checked: false})
    } else {
      this.setState({checked: true})
    }
  }

  render() {
      return (
        <View style={styles.containerStyle}>
          <FormLabel
            containerStyle={styles.labelContainerStyle}>Gebruikersnaam</FormLabel>
          <FormInput
            placeholder='Gebruikersnaam'
            onChangeText={(text) => this.setState({username: text})}
          />
          <FormLabel containerStyle={styles.labelContainerStyle}>Wachtwoord</FormLabel>
          <FormInput
            secureTextEntry={true}
            placeholder='Wachtwoord'
            onChangeText={(text) => this.setState({password: text})}/>
          <CheckBox
            containerStyle={styles.checkbox}
            title='Onthoud mijn inloggegevens'
            iconType='material'
            checkedIcon='check'
            uncheckedIcon='clear'
            onPress={() => this.remember()}
            checked={this.state.checked}
          />
          <Button
            buttonStyle={styles.button}
            backgroundColor={colors.green_500}
            onPress={() => this.login()}
            icon={{name: 'done'}}
            title='SUBMIT' />
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
  }
});

export default LoginScreen;
