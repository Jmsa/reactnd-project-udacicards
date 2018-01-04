import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';


export default class Deck extends Component {
    static navigationOptions = {
        title: 'Deck',
    };

    render() {
        const {title, questions} = this.props.navigation.state.params;
        return (
            <View>
                <Text style={deckStyles.primary}>
                    {title}
                </Text>
                <Text style={deckStyles.secondary}>
                    {questions.length} cards
                </Text>
                {/*<Button*/}
                {/*style={deckStyles.customButton}*/}
                {/*// onPress={this.handleAddCard}*/}
                {/*// onPress={() => this.props.navigation.navigate('Deck', {title: title, questions: questions})}*/}
                {/*title="Add Card"*/}
                {/*color="#841584"*/}
                {/*accessibilityLabel="Add a new card to the deck"*/}
                {/*/>*/}
                <Button
                    style={deckStyles.customButton}
                    onPress={() => this.props.navigation.navigate('Quiz', {questions, title})}
                    title="Start Quiz"
                    backgroundColor="#841584"
                    color='white'
                />
                <Button
                    onPress={() => this.props.navigation.navigate('EditDeck', {title, questions})}
                    title="Add Questions"
                    backgroundColor="orange"
                    color='white'
                />
            </View>
        )
    }
}

export const deckStyles = StyleSheet.create({
    primary: {
        fontSize: 48,
        color: 'black',
        textAlign: 'center'
    },
    secondary: {
        fontSize: 24,
        color: 'grey',
        textAlign: 'center'
    },
    customButton: {
        marginTop: 20
    }
});
