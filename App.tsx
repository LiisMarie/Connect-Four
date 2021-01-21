import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {StackParams} from "./src/types/navigation";
import {GameScreen} from "./src/screens/GameScreen";

const Stack = createStackNavigator<StackParams>();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              // @ts-ignore
              name="Connect four"
              component={GameScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
