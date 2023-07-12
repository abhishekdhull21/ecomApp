/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import LeftSideMenu from './src/component/LeftSideMenu';
import {Text} from '@rneui/themed';
import {View} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => (
  // <NavigationContainer>
  //   <Drawer.Navigator
  //     drawerContent={() => <LeftSideMenu />}
  //     edgeWidth={200} // Adjust the edge width for touch sensitivity
  //   >
      <View>
        <Text>Hello world</Text>
      </View>
      // {/* Your app screens */}
  //   </Drawer.Navigator>
  // </NavigationContainer>
);

export default App;
