import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';


export default class Deck extends Component {
    static navigationOptions = {
        title: 'Deck',
    };

    render() {
        const {navigate, state} = this.props.navigation;
        const {title, questions} = state.params;
        return (
            <View>
                <Text style={deckStyles.primary}>
                    {title}
                </Text>
                <Text style={deckStyles.secondary}>
                    {questions.length} cards
                </Text>
                <Button
                    style={deckStyles.customButton}
                    onPress={() => navigate('Quiz', {questions, title})}
                    title="Start Quiz"
                    backgroundColor="#841584"
                    color='white'
                />
                <Button
                    onPress={() => navigate('EditDeck', {title, questions})}
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
