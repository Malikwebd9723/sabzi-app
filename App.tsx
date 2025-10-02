import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigations/appNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // fallback background for safe area
  },
});
