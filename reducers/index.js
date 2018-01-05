import { ADD_DECK, ADD_CARD, GET_DECKS } from '../actions';
import { AsyncStorage } from 'react-native';

const initState = {
    decks: [],
};

const reducer = (state=initState, action) => {
    const { decks } = action;
    switch (action.type) {
        case ADD_DECK: {
            const newDecks = {};
            Object.assign(newDecks,state.decks);
            newDecks[action.deck.title] = action.deck;
            // AsyncStorage.setItem('DECK_LIST', JSON.stringify(newDeckList));
            return {
                ...state,
                decks: newDecks
            }
        }
        // case ADD_CARD: {
        //     const newDeckList = state.deckList.reduce((accumulator, deck) => {
        //         if(deck.title === title) {
        //             return accumulator.concat([{
        //                 title: deck.title,
        //                 questions: deck.questions.concat([{question, answer}])
        //             }]);
        //         } else {
        //             return accumulator.concat([deck]);
        //         }
        //     }, []);
        //     AsyncStorage.setItem('DECK_LIST', JSON.stringify(newDeckList));
        //     return {
        //         ...state,
        //         deckList: newDeckList
        //     }
        // }
        case GET_DECKS: {
            return {
                ...state,
                decks
            }
        }
        default: return state;
    }
};

export default reducer;