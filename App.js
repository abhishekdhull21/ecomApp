/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';
// import LeftSideMenu from './src/component/LeftSideMenu';
import {Text} from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import screens from './src/screen'
import Login from './src/screen/Login';
const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
  <Stack.Navigator initialRouteName={screens.HOME_SCREEN} screenOptions={{headerShown:false}}>
    <Stack.Screen name={screens.LOGIN_SCREEN} component={Login} />
    <Stack.Screen name={screens.HOME_SCREEN} component={HomeScreen} />
  </Stack.Navigator>
</NavigationContainer>
);

export default App;
