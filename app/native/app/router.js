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

import RedScreen from './screens/RedScreen';
import BlueScreen from './screens/BlueScreen';
import ModalScreen from './screens/ModalScreen';
import Counter from './screens/Counter';
import MembersListScreen from './screens/MembersListScreen';
import Tinder from './screens/Tinder';

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
    return (
        <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
    );
}

// const plainScene = Actions.create(
//     <Scene key="root">
//         <Scene key="red" component={RedScreen} title='RedScreen' />
//         <Scene key="blue" component={BlueScreen} title='BlueScreen' />
//         <Scene key="modal" component={ModalScreen} direction="vertical" title="Modal" hideNavBar />
//     </Scene>
// );

const tabScene = Actions.create(

    <Scene key="tabRoot">
        {/* Tab Container */}
         <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#f0f8ff' }}>
            {/* RED BLUE*/}
            <Scene key="routerScene" title="Router" icon={TabIcon}>
                <Scene key="red" component={RedScreen} title="RedScreen" />
                <Scene key="blue" component={BlueScreen} title="BlueScreen" />
            </Scene>

            {/* Redux */}
            <Scene key="reduxScene" title="Redux" icon={TabIcon}>
                <Scene key="counter" component={Counter} title="Counter demo" />
            </Scene>

            {/* MembersList */}
            <Scene key="membersScene" title="Members" icon={TabIcon}>
                <Scene key="membersList" component={MembersListScreen} title="Members" />
            </Scene>

            {/* Tinder */}
            <Scene key="tinderScene" title="Tinder" icon={TabIcon}>
                <Scene key="tinder" component={Tinder} title="Tinder" />
            </Scene>

        </Scene>

        <Scene
            key="modal"
            direction="vertical"
            component={ModalScreen}
            title="Modal"
            hideNavBar
        />
    </Scene>
);

class Routes extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Router
                    scenes={tabScene}
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
