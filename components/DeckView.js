import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {getDeck, deleteDeck} from '../utils/api';
import {gray, red, white, green, purple} from '../utils/colors';
import TextButton from './TextButton';
import {CommonActions } from '@react-navigation/native';

export default class DeckView extends Component {

    constructor(props) {
        super(props);
        const {route = {}} = props;
        const {params: {title} = {}} = route;
        this.state = {
            title,
            questions: [],
        }
    }

    componentDidMount() {
        const {title} = this.state;
        getDeck(title).then(res => res && this.setState({questions: res.questions}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {route: {params}} = prevProps;
        const {route: {params: currentParams}} = this.props;
        if (params?.title !== currentParams?.title) {
            const currentTitle = currentParams?.title;
            if (currentTitle) {
                getDeck(currentTitle).then(res => res && this.setState({questions: res.questions, title: currentTitle}));
            } else {
                this.setState({title: currentTitle});
            }
        }
        if (params?.newQuestion !== currentParams?.newQuestion) {
            this.setState({questions: [...this.state.questions, currentParams.newQuestion]});
        }
    }

    toHome = () => {
        const {route = {}, navigation} = this.props;
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                {
                    name: 'DeckView',
                    params: { title: route.params?.title},
                },
                {name: 'Home'},
            ],
        }));
    }

    onAddCard = () => {
        const {route = {}, navigation} = this.props;
        navigation.navigate('AddCardView', {title: route.params?.title});
    }

    onStartQuiz = () => {
        const {navigation, route = {}} = this.props;
        navigation.navigate('QuizView', {title: route.params?.title});
    }

    onDeleteDeck = () => {
        const {title} = this.state;
        deleteDeck(title).then(this.toHome);
    }

    render() {
        const {title, questions} = this.state;
        const addBtnStyle = Platform.OS === 'ios' ? styles.addBtnIos : styles.addBtnAndroid;
        const startQuizBtnStyle = Platform.OS === 'ios' ? styles.startQuizBtnIos : styles.startQuizBtnAndroid;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{questions.length} Cards</Text>
                <View style={styles.actionButtons}>
                    <TextButton style={addBtnStyle} onPress={this.onAddCard}>Add Card</TextButton>
                    <TextButton style={[addBtnStyle, startQuizBtnStyle]} onPress={this.onStartQuiz}>Start Quiz</TextButton>
                    <TextButton style={styles.deleteLink} onPress={this.onDeleteDeck}>Delete Deck</TextButton>
                </View>
            </View>
        );
    }
}

const commonBtn = {
    minWidth: 200,
    padding: 10,
    margin: 5,
    textAlign: 'center',
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
        fontSize: 18,
        marginTop: 20
    },
    subtitle: {
        color: gray,
        fontSize: 14,
        marginTop: 10
    },
    actionButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    addBtnAndroid: {
        ...commonBtn,
        borderRadius: 2,
        borderWidth: 1,
        backgroundColor: white,
        borderColor: green,
        borderStyle: 'solid',
        color: green,
    },
    startQuizBtnIos: {
        backgroundColor: purple,
        color: white,
        borderColor: purple,
    },
    startQuizBtnAndroid: {
        color: purple,
        borderColor: purple,
    },
    addBtnIos : {
        ...commonBtn,
        borderRadius: 7,
        backgroundColor: green,
        color: white,
    },
    deleteLink: {
        color: red,
        margin: 5,
    }
});