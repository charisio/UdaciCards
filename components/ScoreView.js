import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {black, gray, green, white} from '../utils/colors';
import {clearLocalNotifications, setLocalNotification } from '../utils/helpers';

const ScoreView = ({score, total, navigateToDeck, restartQuiz}) => {
    const backToDeckStyle = Platform.OS === 'ios' ? [styles.btnIos, styles.backToDeckIos] : [styles.btnAndroid, styles.backToDeckAndroid];
    const restartBtnStyle = Platform.OS === 'ios' ? [styles.btnIos, styles.restartBtnIos] : [styles.btnAndroid, styles.restartBtnAndroid];

    useEffect(() => {
        clearLocalNotifications(setLocalNotification());
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Score</Text>
            <Text style={styles.subtitle}>{Math.round(score/total * 100)}%</Text>
            <View style={styles.actionButtons}>
                <Text style={backToDeckStyle} onPress={navigateToDeck}><Ionicons  name='arrow-back' size={18}/> Back to Deck</Text>
                <Text style={restartBtnStyle} onPress={restartQuiz}><FontAwesome name='refresh' size={18}/> Restart Quiz</Text>
            </View>
        </View>
    );
}

const commonBtn = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minWidth: 130,
    padding: 10,
    margin: 5,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15,
    },
    title: {
        fontSize: 60,
        marginBottom: 20
    },
    subtitle: {
        color: gray,
        fontSize: 25,
        marginTop: 10
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    restartBtnAndroid: {
        color: green,
    },
    restartBtnIos: {
        backgroundColor: green,
    },
    backToDeckAndroid: {
        color: gray,
    },
    backToDeckIos: {
        backgroundColor: gray,
    },
    btnAndroid: {
        ...commonBtn,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: black,
        borderStyle: 'solid',
    },
    btnIos : {
        ...commonBtn,
        borderRadius: 7,
        color: white,
    },
});


ScoreView.propTypes = {
    score: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    navigateToDeck: PropTypes.func.isRequired,
    restartQuiz: PropTypes.func.isRequired,
};

export default ScoreView;

