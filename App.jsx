import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "navigations/RootNavigator";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import './global.css'
import { PaperProvider } from "react-native-paper";
function ThemedApp() {
  const { theme, colors } = useTheme();
const paperTheme = {
  dark: theme === 'dark',
  roundness: 8,
  colors: {
    ...colors,
    primary: colors.text,
    background: colors.background,
    surface: colors.card,
    surfaceVariant: colors.card,
    onSurface: colors.text,
    onSurfaceVariant: colors.subText,
    outline: colors.border,
    elevation: {
      level0: 'transparent',
      level1: colors.card,
      level2: colors.card,
      level3: colors.card,
      level4: colors.card,
      level5: colors.card,
    },
  },
};


  return (
    <PaperProvider theme={paperTheme}>
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}


export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
