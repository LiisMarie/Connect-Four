import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {Statistics} from "../components/Statistics";
import {Board} from "../components/Board";
import {emptyGameBoard, IAppContext, initialContext, PlayerType, AppContextProvider} from "../context/appContext";
import cloneDeep from "lodash/cloneDeep";

export const GameScreen = () => {
    const window = useWindowDimensions();  // for the rotation
    const isPortrait = () => window.height > window.width;
    const orientationStyle = () => (isPortrait() ? 'column' : 'row');

    const startNewGame = (startingPlayer: PlayerType) => {
        setState({
            ...state,
            gameBoard: cloneDeep(emptyGameBoard),
            moves: 0,
            nextMoveBy: startingPlayer,
            gameWon: ' ',
        })
    };
    const makeMove = (columnNr: number, rowNr: number) => {
        // @ts-ignore
        setState(prevState => ({
            ...prevState,
            moves: setMovesCount(columnNr, rowNr, prevState),
            nextMoveBy: setNextMoveBy(columnNr, rowNr, prevState),
            gameBoard: setMoveOnBoard(columnNr, rowNr, prevState),
            gameWon: checkWinner(prevState.gameBoard),
        }));
    };
    const validateMove = (columnNr: number, rowNr: number, prevState: IAppContext) => {
        // @ts-ignore
        if (prevState.gameBoard[columnNr][rowNr] === ' ' && prevState.gameWon === ' ') {
            // @ts-ignore
            if (rowNr == 5 || prevState.gameBoard[columnNr][rowNr + 1] !== ' ') {
                return true;
            }
        }
        return false;
    };
    const setMovesCount = (columnNr: number, rowNr: number, prevState: IAppContext) => {
        if (validateMove(columnNr, rowNr, prevState)) {
            return prevState.moves + 1;
        }
        return prevState.moves;
    };
    const setMoveOnBoard = (columnNr: number, rowNr: number, prevState: IAppContext) => {
        if (validateMove(columnNr, rowNr, prevState)) {
            // @ts-ignore
            prevState.gameBoard[columnNr][rowNr] = prevState.nextMoveBy;
            return prevState.gameBoard;
        }
        return prevState.gameBoard;
    };
    const setNextMoveBy = (columnNr: number, rowNr: number, prevState: IAppContext) => {
        if (validateMove(columnNr, rowNr, prevState)) {
            return prevState.nextMoveBy === 'X' ? 'O' : 'X';
        }
        return prevState.nextMoveBy;
    };
    const checkLine = (a: string, b: string, c: string, d: string) => {
        // Check first cell non-zero and all cells match
        return ((a != ' ') && (a == b) && (a == c) && (a == d));
    };
    const checkWinner = (originalGameBoard: Object) => {
        const reverseGameBoard = cloneDeep(emptyGameBoard);
        for (let column = 0; column < 7; column++) {
            for (let row = 0; row < 6; row++) {
                // @ts-ignore
                reverseGameBoard[row][column] = originalGameBoard[column][row];
            }
        }

        // Check down
        for (let row = 0; row < 3; row++)
            for (let column = 0; column < 7; column++)
                // @ts-ignore
                if (checkLine(reverseGameBoard[row][column], reverseGameBoard[row + 1][column], reverseGameBoard[row + 2][column], reverseGameBoard[row + 3][column])) {
                    // @ts-ignore
                    return reverseGameBoard[row][column];
                }

        // Check right
        for (let row = 0; row < 6; row++)
            for (let column = 0; column < 4; column++)
                // @ts-ignore
                if (checkLine(reverseGameBoard[row][column], reverseGameBoard[row][column + 1], reverseGameBoard[row][column + 2], reverseGameBoard[row][column + 3])) {
                    // @ts-ignore
                    return reverseGameBoard[row][column];
                }

        // Check down-right
        for (let row = 0; row < 3; row++)
            for (let column = 0; column < 4; column++)
                // @ts-ignore
                if (checkLine(reverseGameBoard[row][column], reverseGameBoard[row + 1][column + 1], reverseGameBoard[row + 2][column + 2], reverseGameBoard[row + 3][column + 3])) {
                    // @ts-ignore
                    return reverseGameBoard[row][column];
                }

        // Check down-left
        for (let row = 3; row < 6; row++)
            for (let column = 0; column < 4; column++)
                // @ts-ignore
                if (checkLine(reverseGameBoard[row][column], reverseGameBoard[row - 1][column + 1], reverseGameBoard[row - 2][column + 2], reverseGameBoard[row - 3][column + 3])) {
                    // @ts-ignore
                    return reverseGameBoard[row][column];
                }
        return ' ';
    };
    const initialState: IAppContext = {
        ...initialContext,
        startNewGame: startNewGame,
        makeMove: makeMove,
    };
    const [state, setState] = useState(initialState);

    return (
        <AppContextProvider value={state}>
            <View style={{
                ...styles.container,
                flexDirection: orientationStyle(),
            }}>
                <View style={styles.component}>
                    <Statistics/>
                </View>
                <View style={styles.component}>
                    <Board/>
                </View>
            </View>
        </AppContextProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9d8ea',
    },
    component: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
