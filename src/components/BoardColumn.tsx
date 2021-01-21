import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {AppContext, buttonPlayerOColor, buttonPlayerXColor, buttonUnusedColor} from "../context/appContext";

export interface Props {
    columnNumber: number;
}

export const BoardColumn = (props: Props) => {
    const context = useContext(AppContext);
    const unusedButton = [styles.button, styles.unusedButton];
    const playerXButton = [styles.button, styles.playerXButton];
    const playerOButton = [styles.button, styles.playerOButton];

    const getButtonStyle = (columnNr: number, rowNr: number) => {
        // @ts-ignore
        const gameBoardField = context.gameBoard[columnNr][rowNr];
        if (gameBoardField == 'X') {
            return playerXButton;
        } else if (gameBoardField == 'O') {
            return playerOButton;
        }
        return unusedButton;
    };

    return (
        <View style={styles.column}>
            <View style={styles.rowElement}>
                <TouchableOpacity
                    style={getButtonStyle(props.columnNumber, 0)}
                    onPress={() => context.makeMove(props.columnNumber, 0)}/>
            </View>
            <View style={styles.rowElement}>
                <View style={styles.rowElement}>
                    <TouchableOpacity
                        style={getButtonStyle(props.columnNumber, 1)}
                        onPress={() => context.makeMove(props.columnNumber, 1)}/>
                </View>
            </View>
            <View style={styles.rowElement}>
                <View style={styles.rowElement}>
                    <TouchableOpacity
                        style={getButtonStyle(props.columnNumber, 2)}
                        onPress={() => context.makeMove(props.columnNumber, 2)}/>
                </View>
            </View>
            <View style={styles.rowElement}>
                <View style={styles.rowElement}>
                    <TouchableOpacity
                        style={getButtonStyle(props.columnNumber, 3)}
                        onPress={() => context.makeMove(props.columnNumber, 3)}/>
                </View>
            </View>
            <View style={styles.rowElement}>
                <View style={styles.rowElement}>
                    <TouchableOpacity
                        style={getButtonStyle(props.columnNumber, 4)}
                        onPress={() => context.makeMove(props.columnNumber, 4)}/>
                </View>
            </View>
            <View style={styles.rowElement}>
                <View style={styles.rowElement}>
                    <TouchableOpacity
                        style={getButtonStyle(props.columnNumber, 5)}
                        onPress={() => context.makeMove(props.columnNumber, 5)}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'baseline',
    },
    rowElement: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    button: {
        flex: 1,
        width: '90%',
        height: '90%',
        borderRadius: 100,
    },
    playerXButton: {
        backgroundColor: buttonPlayerXColor,
    },
    playerOButton: {
        backgroundColor: buttonPlayerOColor,
    },
    unusedButton: {
        backgroundColor: buttonUnusedColor,
    },
});
