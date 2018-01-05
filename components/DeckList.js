import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getDecks} from '../actions';
import {Deck, deckStyles} from "./Deck";
import {createArrayFromObject} from '../utils/helpers';

// export function DeckListItem(deck) {
//     const onPress = () => {
//         this.props.navigation.navigate('Deck', {deck})
//     };
//
//     const {title, questions} = deck;
//
//     return (
{/*<TouchableOpacity onPress={onPress} style={styles.deckListItem} key={`${title}-${questions.length}`}>*/
}
{/*<View>*/
}
{/*<Text style={styles.deckTitle}>*/
}
// {title}
// </Text>
{/*<Text style={styles.deckCount}>*/
}
// {questions.length} cards
// </Text>
// </View>
// </TouchableOpacity>
// );
// }

class DeckList extends Component {

    render() {
        const {decks} = this.props;
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.deckList}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="default"
                />
                {createArrayFromObject(decks).map((deck) => {
                    const {title, questions} = deck;

                    return (
                        <TouchableOpacity
                            onPress={() => navigate('Deck', {title: title, questions: questions})}
                            style={styles.deckListItem}
                            key={`${title}-${questions.length}`}>
                            <View>
                                <Text style={deckStyles.primary}>
                                    {title}
                                </Text>
                                <Text style={deckStyles.secondary}>
                                    {questions.length} cards
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    onPress={() => navigate('EditDeck', {title: '', questions: [], decks})}
                    style={styles.deckListItem}
                >
                    <View>
                        <Text style={deckStyles.secondary}>Add new deck</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckList: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',
    },
    deckListItem: {
        height: 200,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
});
const mapStateToProps = (state) => {
    return {
        decks: state.decks
    }
};

export default connect(mapStateToProps, {getDecks})(DeckList)
