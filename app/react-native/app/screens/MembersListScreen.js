import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

const REQUEST_URL = 'https://api.meetup.com/WebDevelopment-Nederland/events/237701686/rsvps?photo-host=public&sig_id=148936292&sig=791565ae64fe83088cdcd2bc5d464b7a715c7f47';

class MembersListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    getMemberImageUrl(member) {
        if (member.photo && member.photo.highres_link) {
            return member.photo.highres_link;
        }

        if (member.photo && member.photo.photo_link) {
            return member.photo.photo_link;
        }

        return 'http://combonetwork.com/img/empty_profile.png';
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('Response from meetup api: ', responseData);
                this.setState({
                    members: responseData,
                });
            })
            .done();
    }

    render() {
        console.log('Render started: ', this.state.members);
        if (!this.state.members || this.state.members.length === 0) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.welcome}>Loading members.......</Text>
                </View>
            );
        }

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows(this.state.members);

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
                                    source={{ uri: this.getMemberImageUrl(rowData.member) }}
                                    resizeMode="cover"
                                />
                                <Text style={styles.text}>{rowData.member.name}</Text>
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
        marginBottom: 50,
        marginTop: 80,
    },
    row: {
        marginTop: 4,
        padding: 16,
        paddingLeft: 0,
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        height: 100
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginLeft: 10
    },
    text: {
        marginLeft: 8,
        flex: 1,
        fontSize: 20
    },
    listContent: {
        padding: 16,
        paddingTop: 0,
    },
});

export default MembersListScreen;