import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from 'screens/LoginScreen';
import SignUpScreen from 'screens/SignupScreen';
import TransactionHistory from 'screens/TransactionHistory';
import { useTheme } from '../context/ThemeContext';
import CategoryDetail from 'screens/admin/CategoryDetail';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Your main tab navigation */}
      <Stack.Screen name="home" component={TabNavigator} />

      {/* Additional stack screens */}
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="transactionHistory" 
      component={TransactionHistory}
      options={{ 
        headerShown: true, 
        title: "Transaction History", 
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        }} />
      <Stack.Screen name="categoryDetail" 
      component={CategoryDetail}
      options={{ 
        headerShown: true, 
        title: "Category Detail", 
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        }} />
    </Stack.Navigator>
  );
}
