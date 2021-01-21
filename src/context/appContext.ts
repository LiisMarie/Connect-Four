import React from "react";
import cloneDeep from "lodash/cloneDeep";

export type PlayerType = 'X' | 'O';

export interface IAppContext {
    moves: number;
    nextMoveBy: PlayerType;
    gameBoard: object;
    startNewGame: (startingPlayer: PlayerType) => void;
    makeMove: (columnNr: number, rowNr: number) => void;
    gameWon: string;
}

const emptyFunction = () => {
};
export const emptyGameBoard: Object = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "]];
export const initialContext: IAppContext = {
    moves: 0,
    nextMoveBy: 'X',
    gameBoard: cloneDeep(emptyGameBoard),
    startNewGame: emptyFunction,
    makeMove: emptyFunction,
    gameWon: ' ',
};

export const buttonUnusedColor = '#F7F2F8';
export const buttonPlayerXColor = '#FFFF41';
export const buttonPlayerOColor = '#FF0018';
export const buttonStartNewGame = '#DD5040';

export const AppContext = React.createContext<IAppContext>(initialContext);
export const AppContextProvider = AppContext.Provider;
