// TODO: move out to something like constants.
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const GET_DECKS = 'GET_DECKS';

export const addDeck = (title, questions = []) => ({
    type: ADD_DECK,
    deck: {
        title,
        questions
    }
});

export const addCard = (title, question, answer) => ({
    type: ADD_CARD,
    question,
    title,
    answer
});

export const getDecks = () => ({
    type: GET_DECKS
});
