import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

import Constants from '../config/constants';
import Colors from '../config/colors';

// import {Environment} from '../config/environment';
const REQUEST_URL = Constants.BASE_URL + 'players/stats';

class LeaderboardScreen extends Component {

    constructor(props) {
      props.title="Leaderboard";
        super(props);
        this.state = {
            players: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    getPlayerImageUrl(player) {
        if (player && player.avatarUrl) {
            return player.avatarUrl;
        }

        return 'http://combonetwork.com/img/empty_profile.png';
    }

    fetchData() {
        fetch(REQUEST_URL, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token=' + Constants.API_TOKEN,
          }
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    players: responseData
                });
            })
            .done();
    }

    render() {
        console.log('Render started: ', this.state.players);
        if (!this.state.players || this.state.players.length === 0) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.welcome}>Loading leaderboard...</Text>
                </View>
            );
        }

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows(this.state.players);

        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    dataSource={dataSource}
                    contentContainerStyle={styles.listContent}
                    renderRow={(rowData) =>
                        <TouchableHighlight style={styles.row}>
                            <View style={styles.item}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: this.getPlayerImageUrl(rowData.user) }}
                                    resizeMode="cover"
                                />
                                <View>
                                  <Text style={styles.title}>{rowData.user.firstName} {rowData.user.lastName}</Text>
                                  <Text style={styles.text}>Wins: {rowData.stat.gamesWon}</Text>
                                  <Text style={styles.text}>Losses: {rowData.stat.gamesLost}</Text>
                                  <Text style={styles.text}>Ratio: {rowData.stat.gameRatio}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 0,
        marginTop: 60,
        backgroundColor: Colors.grey6
    },
    row: {
        marginLeft: 14,
        marginRight: 14,
        marginTop: 10,
        backgroundColor: 'white',
         borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 3,
        shadowColor: '#666', // shadow doesn't work on Android, perhaps use https://github.com/879479119/react-native-shadow
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.3
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        height: 80
    },
    image: {
        marginTop: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 10
    },
    title: {
        marginLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 20
    },
    text: {
        marginLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 14
    },
    listContent: {
        padding: 2,
        paddingTop: 0,
    },
});


export default LeaderboardScreen;
