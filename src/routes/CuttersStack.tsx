import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();

const CuttersStack = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: 'black'}}}>
            <Tab.Screen name="MapScreen" component={MapScreen}/>
        </Tab.Navigator>
    );
};

export default CuttersStack;
