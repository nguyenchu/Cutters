import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CuttersStack from './src/routes/CuttersStack';

const Stack = createStackNavigator();

const HomeScreen  = ({navigation}: { navigation: any }) => {
  setTimeout(() => {
    navigation.navigate('CuttersStack');
  }, 1500);

  return (
    <View style={styles.container}>
      <Text>Cutters</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen } />
        <Stack.Screen name="CuttersStack" component={CuttersStack} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
