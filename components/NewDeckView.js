import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import {black, blue, purple, white} from '../utils/colors';
import {saveDeckTitle} from '../utils/api';
import TextButton from './TextButton';

export default class NewDeckView extends Component {
    state = {
        inputValue: '',
    }

    onChangeText = (inputValue) => {
        this.setState({inputValue});
    }

    onSubmit = () => {
        const {inputValue} = this.state;
        saveDeckTitle(inputValue);
        this.props.navigation.navigate('DeckView', {title: inputValue});
    }

    render() {
        const {inputValue} = this.state;
        const submitBtn = Platform.OS === 'ios' ? styles.submitBtnIOs : styles.submitBtnAndroid;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput style={styles.deckInput} placeholder={'Deck Title'} onChangeText={this.onChangeText} value={inputValue} autoFocus={true}/>
                <TextButton style={[!inputValue && styles.disabled, submitBtn]} disabled={!inputValue} onPress={this.onSubmit}>Create Deck</TextButton>
            </View>
        );
    }
}

const commonBtn = {
    padding: 10,
    marginTop: 20,
    minWidth: 100,
    alignSelf: 'center',
    textAlign: 'center',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 15,
    },
    title: {
        marginBottom: 20,
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
        padding: 10,
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
})
