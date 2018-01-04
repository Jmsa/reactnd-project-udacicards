import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz'
import reducer from './reducers'
import EditDeck from "./components/EditDeck";

const Stack = StackNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            title: 'Quiz Decks'
        }
    },
    Deck: {
        screen: Deck
    },
    Quiz: {
        screen: Quiz
    },
    EditDeck: {
        screen: EditDeck
    }
});


const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

// Starting state.
const initialState = {
    decks: {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(logger)
    ));

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Stack/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});
