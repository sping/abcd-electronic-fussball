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

// import {Environment} from '../config/environment';
const REQUEST_URL = Constants.BASE_URL + 'players/stats';

class LeaderboardScreen extends Component {

    constructor(props) {
      props.title="Leaderboard";
        super(props);
        this.state = {
            players: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    getPlayerImageUrl(player) {
        // if (player.photo && player.photo.highres_link) {
        //     return player.photo.highres_link;
        // }

        // if (player.photo && player.photo.photo_link) {
        //     return player.photo.photo_link;
        // }

        return 'http://combonetwork.com/img/empty_profile.png';
    }

    fetchData() {
      var headers = new Headers();
      headers.append("Authorization", "Token token=" + Constants.API_TOKEN);

        fetch(REQUEST_URL, {
          headers: headers
            })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('Response from meetup api: ', responseData);
                this.setState({
                    players: responseData,
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
                                  <Text style={styles.text}>Wins: {rowData.wins}</Text>
                                  <Text style={styles.text}>Losses: {rowData.losses}</Text>
                                  <Text style={styles.text}>Ratio: {rowData.winRatio}</Text>
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
        alignItems: 'center',
        backgroundColor: 'white',
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
        marginTop: 30,
    },
    row: {
        marginTop: 4,
        padding: 2,
        paddingLeft: 0,
        backgroundColor: 'white',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#F0F0F0',
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
