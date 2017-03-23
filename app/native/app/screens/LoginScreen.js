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

import {
  firstName,
  lastName,
  avatarUrl,
  email,
  apiToken,
} from '../actions/userActions';

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import constants from '../config/constants';
import colors from '../config/colors';
import PopupDialog, {
  SlideAnimation,
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';

const LOGIN = constants.BASE_URL + 'login'

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checked: false,
    }
  }

  login() {
    let username = this.state.username;
    let password = this.state.password;
    if (username === "" && password === "") {
      this.popupDialog.show();
    } else {
      fetch(LOGIN, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.props.dispatch(firstName(responseData.firstName));
          this.props.dispatch(lastName(responseData.lastName));
          this.props.dispatch(avatarUrl(responseData.avatarUrl));
          this.props.dispatch(email(responseData.email));
          this.props.dispatch(apiToken(responseData.apiToken));

          constants.API_TOKEN = responseData.apiToken;

          Actions.tabbar();
        }
      })
      .done();
    }
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
            containerStyle={styles.labelContainerStyle}>Emailadres</FormLabel>
          <FormInput
            placeholder='emailadres'
            onChangeText={(text) => this.setState({username: text})}
          />
          <FormLabel containerStyle={styles.labelContainerStyle}>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(text) => this.setState({password: text})}/>
          <CheckBox
            containerStyle={styles.checkbox}
            title='Remember me'
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

          <PopupDialog width={0.8} height={0.4}
            dialogTitle={<DialogTitle title="ERROR" titleStyle={styles.dialogTitleStyle} titleTextStyle={styles.dialogTitleTextStyle}/>}
            ref={(popupDialog) => {this.popupDialog = popupDialog;}}
            dialogAnimation= { new SlideAnimation({slideFrom: 'top'})}
            actions={
              <DialogButton
                buttonStyle={styles.closeButton}
                text="Close"
                onPress={() => {
                  this.popupDialog.dismiss();
                }}
              />
            }
            >
            <View style={styles.dialogBodyContainer}>
              <Text style={styles.dialogBody} numberOfLines={2}>
                Username and password {'\n'}
                not filled in
              </Text>
            </View>
          </PopupDialog>
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
  dialogTitleStyle: {
    backgroundColor: colors.red_500,
  },
  dialogTitleTextStyle: {
    color: 'white'
  },
  dialogBodyContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogBody: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center'
  },
  closeButton: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = (state) => {
    return {
      firstName:  state.user.firstName,
      lastName:   state.user.lastName,
      avatarUrl:  state.user.avatarUrl,
      email:      state.user.email,
      apiToken:   state.user.apiToken,
    }
};

export default connect(mapStateToProps)(LoginScreen);
