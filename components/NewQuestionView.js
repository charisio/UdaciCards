import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {black, blue, purple, white} from '../utils/colors';
import {addCardToDeck} from '../utils/api';
import TextButton from './TextButton';

export default class NewQuestionView extends Component {
    state = {
        question: '',
        answer: '',
    }

    onChangeText = (val, key) => this.setState({[key]: val});

    onSubmit = () => {
        const {question, answer} = this.state;
        const {route = {}, navigation} = this.props;
        const {title} = route.params;
        const newQuestion = {question, answer};
        addCardToDeck(title, newQuestion);
        navigation.navigate('DeckView', {title, newQuestion});
    }

    render() {
        const {question, answer} = this.state;
        const disabled = !question || !answer;
        return (
            <View style={styles.container}>
                <TextInput style={styles.deckInput} placeholder={'Question'} onChangeText={(val) => this.onChangeText(val, 'question')} value={question}/>
                <TextInput style={styles.deckInput} placeholder={'Answer'} onChangeText={(val) => this.onChangeText(val, 'answer')} value={answer}/>
                <TextButton style={[disabled && styles.disabled, styles.submitBtnAndroid]} disabled={disabled} onPress={this.onSubmit}>Submit</TextButton>
            </View>
        );
    }
}

const commonBtn = {
    padding: 10,
    margin: 10,
    minWidth: 100,
    textAlign: 'center',
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 15,
    },
    title: {
        marginTop: 30,
        fontSize: 30,
    },
    disabled: {
        opacity: 0.6,
    },
    deckInput: {
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: black,
        padding: 5,
        minWidth: 300,
        margin: 10,
    },
    submitBtnAndroid: {
        ...commonBtn,
        borderRadius: 2,
        backgroundColor: blue,
        color: white,
    },
    submitBtnIOs: {
        ...commonBtn,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 7,
        color: white,
        backgroundColor: purple,
    },
});