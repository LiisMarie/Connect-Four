import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from "react-native";
import {AppContext, buttonPlayerOColor, buttonPlayerXColor, buttonStartNewGame} from "../context/appContext";

export const Statistics = () => {
    const context = useContext(AppContext);
    const isGameOn = () => context.gameWon == ' ';
    const isBoardFull = () => context.moves >= 42;
    const isPlayerXTurn = () => context.nextMoveBy == 'X';
    const nextMoveByColor = () => (isPlayerXTurn() ? buttonPlayerXColor : buttonPlayerOColor);
    const isPlayerXWinner = () => context.gameWon == 'X';
    const winnerByColor = () => (isPlayerXWinner() ? buttonPlayerXColor : buttonPlayerOColor);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={[styles.text, (!isGameOn() || isBoardFull()) && {display: 'none'}]}>
                    Next move by <View style={{...styles.circle, backgroundColor: nextMoveByColor()}}/>
                </Text>
                <Text style={[styles.text, {fontWeight: "bold"}, isGameOn() && {display: 'none'}]}>
                    THE WINNER IS <View style={{...styles.circle, backgroundColor: winnerByColor()}}/>
                </Text>
                <Text style={[styles.text, {fontWeight: "bold"}, !isBoardFull() && {display: 'none'}]}>
                    GAME OVER!
                </Text>
                <Text style={[styles.text, {fontWeight: "bold"}, !isBoardFull() && {display: 'none'}]}>
                    It is a tie!
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Moves {context.moves}
                </Text>
            </View>
            <View style={styles.container}>
                <Button
                    title={"Start a new game!"}
                    color={buttonStartNewGame}
                    onPress={() => context.startNewGame('X')}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statRow: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: 'green'
    },
    text: {
        fontSize: 25,
    },
});
