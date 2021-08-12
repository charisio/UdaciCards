import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {black, gray, green, red, white, highlighter} from '../utils/colors';

const QuizQuestionView = ({question, onVote, questionNumber, total}) => {
    const mounted = useRef(false);
    const [showAnswer, toggleShowAnswer] = useState(false);
    const checkIconStyle = Platform.OS === 'ios' ? [styles.btnIos, styles.checkIconIos] : [styles.btnAndroid, styles.checkIconAndroid];
    const timesIconStyle = Platform.OS === 'ios' ? [styles.btnIos, styles.timesIconIos] : [styles.btnAndroid, styles.timesIconAndroid];

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            toggleShowAnswer(false);
        }
    }, [question, toggleShowAnswer]);

    return (
        <ScrollView>
            <Text>Question {questionNumber} / {total}</Text>
            <View style={styles.container}>
                <Text style={styles.title}>{question.question}</Text>
                <Text style={styles.subtitle}>Click to {showAnswer ? 'hide' : 'reveal'} answer:
                    <Text style={{color: black, backgroundColor: highlighter}}>{showAnswer && question.answer}</Text>
                </Text>
                <FontAwesome name='eye' size={28} style={{margin: 5}} onPress={() => toggleShowAnswer(!showAnswer)}/>
                <Text style={styles.actionButtonsText}>Did you answer correctly?</Text>
                <View style={styles.actionButtons}>
                    <FontAwesome style={checkIconStyle} name='check' size={18} onPress={() => onVote(1)}/>
                    <FontAwesome style={timesIconStyle} name='times' size={18} onPress={() => onVote(0)}/>
                </View>
            </View>
        </ScrollView>
    );
}

const commonBtn = {
    flex: 1,
    minWidth: 'auto',
    textAlign: 'center',
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
    questionCounter: {
      marginBottom: 50,
      fontSize: 15,
    },
    title: {
        fontSize: 25,
    },
    subtitle: {
        color: gray,
        fontSize: 16,
        marginTop: 10
    },
    actionButtonsText: {
        fontSize: 20,
        marginTop: 50,
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
    },
    timesIconAndroid: {
        color: red,
    },
    timesIconIos: {
        backgroundColor: red,
    },
    checkIconAndroid: {
        color: green,
    },
    checkIconIos: {
        backgroundColor: green,
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

QuizQuestionView.propTypes = {
    question: PropTypes.object.isRequired,
    onVote: PropTypes.func.isRequired,
    questionNumber: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default QuizQuestionView;

