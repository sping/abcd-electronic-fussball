import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SwipeCards from 'react-native-swipe-cards';
import Card from '../components/Card';

const REQUEST_URL = 'https://api.meetup.com/WebDevelopment-Nederland/events/237701686/rsvps?photo-host=public&sig_id=148936292&sig=791565ae64fe83088cdcd2bc5d464b7a715c7f47';

class Tinder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    handleYup(card) {
        console.log(`Is attending for ${card.member.name}`);
    }

    handleNope(card) {
        console.log(`Not attending for ${card.member.name}`);
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

        return (
            <View style={styles.container}>
                <SwipeCards
                    cards={this.state.members}

                    renderCard={(cardData) => <Card { ...cardData } />}
                    renderNoMoreCards={() => <NoMoreCards />}

                    yupText="Attending 🎉"
                    nopeText="Not attending 😖"

                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                />
            </View>
        )
    }
}

const NoMoreCards = () => (
    <View style={[styles.card, { backgroundColor: '#f99' }]} />
);

export default Tinder;

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
        marginBottom: 48,
        marginTop: 64,
        flex: 1,
        backgroundColor: '#fbfbfb'
    }
});

