import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "navigations/RootNavigator";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import './global.css'
function ThemedApp() {
  const { theme, colors } = useTheme();

  return (
    <View className="flex-1">
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
