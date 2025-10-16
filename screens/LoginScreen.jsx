import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "context/ThemeContext";

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }
    ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);
    navigation.replace("home");
  };

  return (
    <SafeAreaView
      className="flex-1 px-6"
      style={{ backgroundColor: colors.background }}
    >
      <View className="flex-1 justify-center">
        {/* Title */}
        <Text
          className="text-3xl font-bold text-center mb-10"
          style={{ color: colors.text }}
        >
          Login
        </Text>

        {/* Email Input */}
        <View
          className="flex-row items-center px-3 rounded-xl mb-4"
          style={{ backgroundColor: colors.card }}
        >
          <Ionicons name="mail-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            className="flex-1 px-3 py-3 text-base"
            style={{ color: colors.text }}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View
          className="flex-row items-center px-3 rounded-xl mb-2"
          style={{ backgroundColor: colors.card }}
        >
          <Ionicons name="key-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            className="flex-1 px-3 py-3 text-base"
            style={{ color: colors.text }}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text
            className="text-sm text-right mb-5"
            style={{ color: colors.text }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          className="py-3 rounded-xl items-center mb-4"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-semibold text-base">Login</Text>
        </Pressable>

        {/* Signup Link */}
        <View className="flex-row justify-end">
          <Text className="text-sm mr-1" style={{ color: colors.text }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace("signup")}>
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.primary }}
            >
              Signup?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
