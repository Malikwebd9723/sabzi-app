import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from 'navigations/RootNavigator';
import AppNavigator from 'navigations/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootNavigator/>
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
