/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';
// import LeftSideMenu from './src/component/LeftSideMenu';
import {Overlay, Text} from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import screens from './src/screen'
import Login from './src/screen/Login';
import Products from './src/screen/Products';
import Cart from './src/screen/Cart';
import OrderDetailScreen from './src/screen/OrderDetailScreen';
import AppContext from './src/context/AppContext';
// import CustomerCreatePopup from './src/component/CustomerCreatePopup';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isCustomerPopupVisible, setCustomerPopupVisible] =  useState(true);
  const toggleCustomerPopup = () => {
    setCustomerPopupVisible(!isCustomerPopupVisible);
  };
  return(
    <>
  {/* <AppContext.Provider value={{isCustomerPopupVisible, toggleCustomerPopup }} > */}
  <NavigationContainer>
  <Stack.Navigator initialRouteName={screens.LOGIN_SCREEN} screenOptions={{headerShown:false}}>
    <Stack.Screen name={screens.LOGIN_SCREEN} component={Login} />
    <Stack.Screen name={screens.HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen name={screens.PRODUCTS_SCREEN} component={Products} />
    <Stack.Screen name={screens.CART_SCREEN} component={Cart} />
    <Stack.Screen name={screens.ORDER_DETAIL_SCREEN} component={OrderDetailScreen} />
  </Stack.Navigator>
</NavigationContainer>
{/* </AppContext.Provider> */}
{/* <Overlay  isVisible={isCustomerPopupVisible} onBackdropPress={toggleCustomerPopup}>
        <CustomerCreatePopup
          onClose={toggleCustomerPopup}
          onCreateCustomer={(customerData) => {
            // Handle creating the customer here
            console.log('New Customer Data:', customerData);
          }}
        />
</Overlay> */}

</>
)};

export default App;
