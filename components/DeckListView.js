import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {getDecks} from '../utils/api';
import {black, gray, green, red, white} from '../utils/colors';

export default class DeckListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
        }
    }

    componentDidMount() {
        getDecks().then(questions => questions && this.setState({questions}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {route: {params}} = prevProps;
        const {route: {params: currentParams}} = this.props;
        if (params?.title !== currentParams?.title) {
            getDecks().then(questions => questions && this.setState({questions}));
        }
    }

    render() {
        const {questions} = this.state
        const questionsArray = Object.values(questions);

        if (!questionsArray.length) {
            return <Text style={[styles.subtitle, {marginTop: 10, textAlign: 'center'}]}> No decks created yet!</Text>
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    {questionsArray.map(question => (
                        <TouchableOpacity style={styles.touchable} key={question.title} onPress={()=> this.props.navigation.navigate('DeckView',
                            { title: question?.title })}>
                            <Text style={styles.title}>{question.title}</Text>
                            <Text style={styles.subtitle}>{question.questions.length} Cards</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15,
    },
    touchable: {
        marginTop: 50,
        alignSelf: 'stretch',
        textAlign: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        color: gray,
        fontSize: 14,
        marginTop: 10,
        alignSelf: 'center',
    },
    actionButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnAndroid: {
        minWidth: 200,
        padding: 10,
        margin: 5,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: black,
        borderStyle: 'solid',
        color: black,
    },
    startQuizBtnColor: {
        backgroundColor: green,
        color: white,
        borderColor: green,
    },
    addBtnIos : {
        minWidth: 200,
        padding: 10,
        margin: 5,
        borderRadius: 7,
        backgroundColor: black,
        color: white,
    },
    deleteLink: {
        color: red,
        margin: 5,
    }
});