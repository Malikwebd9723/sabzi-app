import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Users from 'screens/admin/Users';
import LoginScreen from 'screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Your main tab navigation */}
      <Stack.Screen name="home" component={TabNavigator} />

      {/* Additional stack screens */}
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
