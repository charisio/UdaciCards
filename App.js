import React, {Component} from 'react';
import { Text, View, Platform, StatusBar } from 'react-native'
import {CommonActions, NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import NewQuestionView from './components/NewQuestionView';
import QuizView from './components/QuizView';
import DeckView from './components/DeckView';
import {purple, white, darkGray} from './utils/colors';
import {setLocalNotification} from './utils/helpers';

const Stack = createStackNavigator();
const MainNavigation = () => (
    <Stack.Navigator mode='modal'>
        <Stack.Screen name='Home' component={TabNav} options={{headerShown: false}}/>
        <Stack.Screen name='DeckView' component={DeckView} options={({ route, navigation }) => ({
            ...commonOptions(route),
            newQuestion: route.params?.question,
            headerLeft: () => (<HeaderBackButton tintColor={white} onPress={() => {
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
            }}/>),
        })} />
        <Stack.Screen name='AddCardView' component={NewQuestionView} options={({ route }) => ({
            ...commonOptions(route),
            headerTitle: () => <Text style={{color: white, fontSize: 18, fontWeight: 'bold'}}> Add Card </Text>
        })} />
        <Stack.Screen name='QuizView' component={QuizView}  options={({ route, navigation }) => ({
            ...commonOptions(route),
            counter: route.params?.counter,
            headerTitle: ({children}) => <Text style={{color: white, fontSize: 18, fontWeight: 'bold'}}> Quiz: {children} </Text>,
        })}/>
    </Stack.Navigator>
);
const commonOptions = (route) => ({
    headerTintColor: white,
    headerStyle: {
        backgroundColor: darkGray,
    },
    title: route.params?.title,
});

const Tabs =
    Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator()

const TabNav = () => (
    <Tabs.Navigator
        initialRouteName='Decks'
        lazy={true}
        tabBarOptions={{
          header: null,
          activeTintColor: Platform.OS === 'ios' ? darkGray : white,
          showIcon: true,
          style: {
            height: 80,
            backgroundColor: Platform.OS === 'ios' ? white : darkGray,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
          }
        }}
    >
        <Tabs.Screen
            name='Decks'
            component={DeckListView}
            options={{
                tabBarLabel: 'Decks',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='albums-outline' size={size} color={color}/>
                ),
            }}
        />
        <Tabs.Screen
            name='New Deck'
            component={NewDeckView}
            options={{
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ size, color }) => (
                    <FontAwesome name='plus-square' size={size} color={color}/>
                ),
            }}
        />
    </Tabs.Navigator>
);

export default class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <View style={{flex: 1}} >
                <View style={{backgroundColor: purple, height: Constants.statusBarHeight}}>
                    <StatusBar translucent backgroundColor={purple} barStyle='light-content'/>
                </View>
                <NavigationContainer>
                    <MainNavigation/>
                </NavigationContainer>
            </View>
        );
    }
}