import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import MyUserScreen from '../screens/MyUserScreen';
import HaircutsJournalScreen from '../screens/HaircutsJournalScreen';

const Tab = createBottomTabNavigator();

const CuttersStack = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: 'black'}}}>
            <Tab.Screen name="MapScreen" component={MapScreen}/>
            <Tab.Screen name="HaircutsJournalScreen" component={HaircutsJournalScreen}/>
            <Tab.Screen name="MyUserScreen" component={MyUserScreen}/>
        </Tab.Navigator>
    );
};

export default CuttersStack;
