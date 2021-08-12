import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {getDeck} from '../utils/api';
import QuizQuestionView from './QuizQuestionView';
import ScoreView from './ScoreView';

export default class QuizView extends Component {
    constructor(props) {
        super(props);
        const {route = {}} = props;
        const {params: {title} = {}} = route;
        this.state = {
            counter: 0,
            score: 0,
            title,
            questions: [],
        }
    }

    componentDidMount() {
        const {title} = this.state;
        getDeck(title).then(res => res && this.setState({questions: res.questions}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params: {counter}} = this.props?.route;
        const {params: {counter: prevPropsCounter}} = prevProps?.route;
        const {questions = []} = this.state;
        if (counter === 0 && (prevPropsCounter !== counter || prevState.counter === questions.length)) {
            this.setState({counter, score: counter});
        }
    }

    onVote = (count) => {
        this.setState(prevState => ({
            counter : prevState.counter + 1,
            score: prevState.score + count,
        }));
    }

    navigateToDeck = () => {
        const {navigation, route = {}} = this.props;
        navigation.navigate('DeckView', {title: route.params?.title});
    }

    restartQuiz = () => {
        const {navigation, route = {}} = this.props;
        navigation.navigate('QuizView', {title: route.params?.title, counter: 0});
    }

    render() {
        const {questions, counter, score} = this.state;
        const questionToShow = questions[counter];

        if (!questions.length) {
            return <Text style={styles.noCardsText}>Sorry you cannot take the quiz because there are no cards in the deck!</Text>
        }

        if (counter === questions.length) {
            return <ScoreView score={score} total={questions.length} navigateToDeck={this.navigateToDeck} restartQuiz={this.restartQuiz}/>
        }

        return <QuizQuestionView question={questionToShow} onVote={this.onVote} questionNumber={counter + 1} total={questions.length}/>;
    }
}

const styles = StyleSheet.create({
    noCardsText: {
        padding: 20,
        fontSize: 18
    }
})