import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import Users from '../screens/Users';
import Expense from '../screens/Expense';
import Statistics from '../screens/Statistics';
import { Pressable, Text, View } from 'react-native';
import Categories from 'screens/Categories';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../context/ThemeContext';
export default function TabNavigator() {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: "#1E293B",
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
          headerStyle: {
            backgroundColor: colors.card
          },
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <Pressable onPress={() => navigation.navigate('users')}>
                <Feather name="menu" size={24} color= {colors.text} />
              </Pressable>

              <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: 'bold', color: colors.text }}>
                Dashboard
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              {/* Moon icon */}
              <Pressable onPress={toggleTheme}>
                <Ionicons
                  name={theme === "dark" ? "sunny-outline" : "moon-outline"}
                  size={22}
                  color={theme === "dark" ? "#facc15" : "#6b7280"}
                  style={{ marginRight: 20 }}
                />
              </Pressable>

              {/* Notification bell with badge */}
              <View>
                <Ionicons name="notifications-outline" size={24} color= {colors.text}/>
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: colors.primary,
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
