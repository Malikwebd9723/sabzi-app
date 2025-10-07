import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import Users from '../screens/Users';
import Expense from '../screens/Expense';
import Statistics from '../screens/Statistics';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import Categories from 'screens/Categories';
import { useNavigation } from '@react-navigation/core';

export default function AppNavigator() {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const [colorScheme, setColorScheme] = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderRadius: 30,
          margin: 10,
          position: 'absolute',
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <Pressable onPress={() => navigation.navigate('users')}>
                <Feather name="menu" size={24} color="#374151" />
              </Pressable>

              <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                Dashboard
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              {/* Moon icon */}
              <Ionicons name="moon-outline" size={22} color="#6b7280" style={{ marginRight: 20 }} />

              {/* Notification bell with badge */}
              <View>
                <Ionicons name="notifications-outline" size={24} color="#6b7280" />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: '#0f172a',
                    borderRadius: 10,
                    width: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>3</Text>
                </View>
              </View>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Expense"
        component={Expense}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="money-bill-wave" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="States"
        component={Statistics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
