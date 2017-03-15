import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
} from 'react-native';
import { connect } from 'react-redux'
import { increment, decrement } from '../actions/myActions';

class Counter extends React.Component {

    increment() {
        this.props.dispatch(increment());
    }

    decrement() {
        this.props.dispatch(decrement());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.counterText}>{this.props.myCounter}</Text>
                <Button
                    color='blue'
                    backgroundColor='blue'
                    onPress={() => this.increment()}
                    title="Increment"
                />
                <Button
                    color='red'
                    onPress={() => this.decrement()}
                    title="Decrement"
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myCounter: state.counter.counter,
    }
};

export default connect(mapStateToProps)(Counter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    counterText: {
        fontSize: 100,
        color: 'green',
    },
    myCounter: {
        borderColor: 'blue',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterValue: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textInput: {
        width: 300,
        height: 50,
        color: 'black'
    },
});
