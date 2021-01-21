import React from 'react';
import {View, StyleSheet} from "react-native";
import {BoardColumn} from "./BoardColumn";

export const Board = () => {
    return (
        <View style={styles.container}>
            <BoardColumn columnNumber={0}/>
            <BoardColumn columnNumber={1}/>
            <BoardColumn columnNumber={2}/>
            <BoardColumn columnNumber={3}/>
            <BoardColumn columnNumber={4}/>
            <BoardColumn columnNumber={5}/>
            <BoardColumn columnNumber={6}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignContent: 'flex-start',
        padding: 4,
        flexDirection: 'row',
    },
});