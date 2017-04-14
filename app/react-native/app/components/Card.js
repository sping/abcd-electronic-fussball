import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

const Card = (member) => {

    const { width } = Dimensions.get('window');
    const cardWidth = width - 40;

    return (
        <View style={[styles.card, { width: cardWidth, flexDirection: 'column' }]}>
            <Image
                style={styles.image}
                source={{ uri: getMemberImageUrl(member.member) }}
                resizeMode="cover"
            />
            <Text style={styles.text}>{member.member.name}</Text>
        </View>
    );
}

const getMemberImageUrl = (member) => {
    if (member.photo && member.photo.highres_link) {
        return member.photo.highres_link;
    }

    if (member.photo && member.photo.photo_link) {
        return member.photo.photo_link;
    }

    return 'http://combonetwork.com/img/empty_profile.png';
}

export default Card;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#666', // shadow doesn't work on Android, perhaps use https://github.com/879479119/react-native-shadow
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 8,
        shadowOpacity: 0.3
    },
    image: {
        flex: 1,
        height: 300,
    },
    text: {
        marginTop: 10,
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
    }
});