import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Router,
    Scene,
    Actions,
} from 'react-native-router-flux';

import LoginScreen from './screens/LoginScreen';
import TabbarComponent from './components/TabbarComponent';

const defaultScene = Actions.create(
  <Scene key="root">
    <Scene key="Login" component={LoginScreen} hideNavBar/>
    <Scene key="Timeline" component={TabbarComponent} hideNavBar/>
  </Scene>
)

class Routes extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Router
                    scenes={defaultScene}
                />
            </View>
        );
    }
}

export default Routes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigationBarStyle: {
        backgroundColor: 'white',
        borderBottomColor: '#e1141d',
        paddingLeft: 20,
        paddingRight: 12,
        borderBottomWidth: 1,

    },
    titleStyle: {
        textAlign: 'left',
        fontSize: 22,
        alignSelf: 'auto',
        color: 'green',
    },
    rightButtonTextStyle: {
        color: '#011e31',
        fontSize: 16,
    },
});
