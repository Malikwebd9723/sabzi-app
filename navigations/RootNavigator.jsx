import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from 'screens/LoginScreen';
import SignUpScreen from 'screens/SignupScreen';
import TransactionHistory from 'screens/TransactionHistory';
import { useTheme } from '../context/ThemeContext';
import CategoryDetail from 'screens/admin/CategoryDetail';
import OrdersScreen from 'screens/OrdersScreen';
import InvoiceScreen from 'screens/InvoiceScreen';
import CreateOrderScreen from 'screens/CreateOrderScreen';

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
      <Stack.Screen name="ordersScreen" 
      component={OrdersScreen}
      options={{ 
        headerShown: true, 
        title: "Orders", 
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        }} />
      <Stack.Screen name="invoiceScreen" 
      component={InvoiceScreen}
      options={{ 
        headerShown: true, 
        title: "Invoice", 
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        }} />
      <Stack.Screen name="createOrderScreen" 
      component={CreateOrderScreen}
      options={{ 
        headerShown: true, 
        title: "Create - Update Order", 
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        }} />
    </Stack.Navigator>
  );
}
