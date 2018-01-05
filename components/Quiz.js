import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

export default class Quiz extends Component {
    static navigationOptions = {
        title: 'Quiz',
    };

    state = {
        currentQuestion: 0,
        correctQuestions: 0,
        totalQuestions: 0,
        showAnswer: false,
        quizComplete: false,
        title: ''
    };

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
        const {questions, title} = this.props.navigation.state.params;
        this.setState({totalQuestions: questions.length, title: title});
    };

    resetQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctQuestions: 0,
            quizComplete: false,
        });
    };

    backToDeckList = () => {
        this.props.navigation.navigate('DeckList');
    };

    questionUI(question, index) {
        let {showAnswer, totalQuestions, correctQuestions, title} = this.state;
        let friendlyIndex = index + 1;

        const correctAnswer = () => {
            const nextIndex = index + 1;
            const quizComplete = nextIndex >= totalQuestions;
            const newState = {
                correctQuestions: correctQuestions + 1,
                showAnswer: false,
                quizComplete: quizComplete,
                currentQuestion: quizComplete ? 0 : nextIndex
            };
            this.setState(newState);
        };
        const incorrectAnswer = () => {
            const nextIndex = index + 1;
            const quizComplete = nextIndex >= totalQuestions;
            const newState = {
                showAnswer: false,
                quizComplete: quizComplete,
                currentQuestion: quizComplete ? 0 : nextIndex
            };
            this.setState(newState);
        };

        return (
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.answer}>{friendlyIndex} of {totalQuestions}</Text>
                <Text style={styles.question}>Q: {question.question}</Text>
                {showAnswer
                    ? <Text style={styles.answer}>A: {question.answer}</Text>
                    : null
                }
                <Button
                    style={styles.customButton}
                    onPress={() => this.setState({showAnswer: !this.state.showAnswer})}
                    title="Show Answer"
                    color="white"
                    backgroundColor="#841584"
                />
                <Button
                    onPress={correctAnswer}
                    title="Correct"
                    color='white'
                    backgroundColor='green'
                />
                <Button
                    onPress={incorrectAnswer}
                    title="InCorrect"
                    color='white'
                    backgroundColor='red'
                />
            </View>
        )
    }

    render() {
        const {questions, title} = this.props.navigation.state.params;
        const {currentQuestion, quizComplete, correctQuestions, totalQuestions} = this.state;
        const quizCompleteUI = <View>
            <Text style={styles.question}>{title} Results</Text>
            <Text style={styles.answer}>{correctQuestions}/{totalQuestions}</Text>
            <Text style={styles.answer}>{correctQuestions / (totalQuestions / 100)}%</Text>

            <Button
                onPress={this.resetQuiz}
                title="Take Quiz Again"
                backgroundColor="green"
                color='white'
            />
            <Button
                onPress={this.backToDeckList}
                title="Pick Another Quiz Deck"
                backgroundColor="#841584"
                color='white'
            />
        </View>;

        return (
            <View>
                {quizComplete
                    ? quizCompleteUI
                    : questions.map((question, i) => {
                        return (
                            <View key={`question-${i}-${new Date().getTime()}`}>
                                {currentQuestion === i
                                    ? this.questionUI(question, i)
                                    : null
                                }
                            </View>
                        )
                    })}
                {/*<Button*/}
                {/*style={styles.customButton}*/}
                {/*onPress={this.handleAddCard}*/}
                {/*title="Add Card"*/}
                {/*color="#841584"*/}
                {/*accessibilityLabel="Add a new card to the deck"*/}
                {/*/>*/}
                {/*<Button*/}
                {/*style={styles.customButton}*/}
                {/*onPress={this.handleStartQuiz}*/}
                {/*title="Start Quiz"*/}
                {/*color="#841584"*/}
                {/*accessibilityLabel="Start this quiz deck"*/}
                {/*/>*/}
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
