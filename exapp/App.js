import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from './screens/splash';
import Geofence from './screens/geofence';
import Signup from './screens/signup';
import Volunteer from './screens/volunteer';
import Explore from './screens/explore';
import Parks from './screens/parks';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
        <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Geofence" 
        component={Geofence} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Volunteer" 
        component={Volunteer} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Explore" 
        component={Explore} 
        options={{ headerShown: false}} 
      />
       <Stack.Screen 
        name="Parks" 
        component={Parks} 
        options={{ headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('app', () => App);
