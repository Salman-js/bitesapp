import React from 'react';
import 'react-native-gesture-handler';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import HomeScreen from './homeScreen';
import RestaurantScreen from './restaurantScreen';
import CartScreen from './cartScreen';
import TrackingScreen from './trackingScreen';

const Stack = createStackNavigator();
export default function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Restaurant'
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name='Track'
        component={TrackingScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
}
