import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Screens
 */
import { NewGame } from './new-game';
import { GameBoard } from './game-board';

const Stack = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'newGame'}>
                <Stack.Screen
                    name={'newGame'}
                    component={NewGame}
                    options={{
                        header: () => null,
                    }}
                />
                <Stack.Screen
                    name={'gameBoard'}
                    component={GameBoard}
                    options={{
                        header: () => null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
