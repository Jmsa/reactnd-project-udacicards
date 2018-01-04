import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {FormInput, FormLabel, Divider, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addDeck} from '../actions';

class EditDeck extends Component {
    state = {
        title: '',
        questions: []
    };

    componentDidMount() {
        const {title, questions} = this.props.navigation.state.params;
        this.setState({title: title ? title : '', questions: questions ? questions : []});
    };

    saveDeck = () => {
        this.props.addDeck(this.state.title, this.state.questions);
        this.props.navigation.navigate('DeckList');
    };

    render() {
        // const {} = this.props.navigation.state.params;
        const {questions, title} = this.state;
        const newQuestion = {
            question: '',
            answer: ''
        };

        return (
            <View>
                <FormLabel>New Deck Name</FormLabel>
                <FormInput
                    value={title}
                    onChangeText={(value) => this.setState({title: value})}/>

                {questions.map((question, i) => {
                    return (
                        <View key={`editing-question-${i}`}>
                            <Divider style={{backgroundColor: 'blue'}}/>
                            <FormLabel>Question</FormLabel>
                            <FormInput
                                value={question.question}
                                onChangeText={(value) => {
                                    let newQuestions = questions;
                                    newQuestions[i] = {question: value, answer: question.answer};
                                    this.setState({questions: newQuestions})}}/>
                            <FormLabel>Answer</FormLabel>
                            <FormInput
                                value={question.answer}
                                onChangeText={(value) => {
                                    let newQuestions = questions;
                                    newQuestions[i] = {question: question.question, answer: value};
                                    this.setState({questions: newQuestions})}}/>
                        </View>

                    )
                })}

                <Button
                    onPress={() => this.setState({questions: questions.concat(newQuestion)})}
                    title="Add Question"
                    backgroundColor="#841584"
                    color='white'
                />

                <Button
                    onPress={this.saveDeck}
                    title="Save Deck"
                    backgroundColor="green"
                    color='white'
                />

                <Button
                    onPress={() => this.props.navigation.navigate('DeckList')}
                    title="Cancel"
                    backgroundColor="red"
                    color='white'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        color: 'black',
        textAlign: 'center'
    },
    count: {
        fontSize: 24,
        color: 'grey',
        textAlign: 'center'
    },
    customButton: {
        marginTop: 20
    },
    question: {
        textAlign: 'center',
        fontSize: 36,
    },
    answer: {
        textAlign: 'center',
        fontSize: 24,
        color: 'grey'
    }
});

const mapStateToProps = (state) => {
    return {
        decks: state.decks
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            addDeck
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck)