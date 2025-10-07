import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { lightTheme, darkTheme } from "../theme/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState("dark"); // ✅ Always start with dark

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        const initialTheme = savedTheme || "dark"; // ✅ Fallback to dark
        setTheme(initialTheme);
        setColorScheme(initialTheme);
      } catch (error) {
        console.warn("Error loading theme:", error);
        setColorScheme("dark");
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setColorScheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const colors = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
