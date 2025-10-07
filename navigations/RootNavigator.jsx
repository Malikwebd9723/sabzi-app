import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import Users from 'screens/Users';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Your main tab navigation */}
      <Stack.Screen name="Tabs" component={AppNavigator} />

      {/* Additional stack screens */}
      <Stack.Screen name="users" component={Users} />
    </Stack.Navigator>
  );
}
