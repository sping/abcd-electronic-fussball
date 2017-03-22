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
import Avatar from 'react-native-interactive-avatar';

import colors from '../config/colors';

class AccountScreen extends Component {

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
  },
  animatedView: {
    alignItems: 'center'
  }
});

export default AccountScreen;
