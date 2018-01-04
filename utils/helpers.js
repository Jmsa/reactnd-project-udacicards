// To manage your AsyncStorage database, you'll want to create four different helper methods.
//
//     getDecks: return all of the decks along with their titles, questions, and answers.
//     getDeck: take in a single id argument and return the deck associated with that id.
//     saveDeckTitle: take in a single title argument and add it to the decks.
//     addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

export function getDecks() {
    return null;
}

export function getDeck(id) {
    return null;
}

export function saveDeckTitle(title) {
    return null;
}

export function addCardToDeck(title, card) {
    return null;
}

export function createArrayFromObject(obj) {
    const newArray = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newArray.push(obj[prop]);
        }
    }
    return newArray;
}

// Given an array return and object where the key can be specified and the entire item at index
// is the property.
export function createObjectFromArray(arr, k = 'id') {

    if (!arr || arr.length === 0) {
        return {};
    }

    // Create an object from each item in the array - using the id as key to match.
    const objects = arr.map((d) => {
        return {
            [d[k]]: d
        }
    });

    // Merge the objects into 1.
    return Object.assign(...objects);
}