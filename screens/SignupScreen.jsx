import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "context/ThemeContext";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    alert("Account created successfully!");
    navigation.replace("Login"); // Navigate to Login after signup
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text
          className="text-center text-3xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          Sign Up
        </Text>

        {/* Full Name */}
        <View
          className="flex-row items-center px-3 py-3 mb-4 rounded-xl"
          style={{ backgroundColor: colors.card }}
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={20}
            color= {colors.text}
          />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            value={form.name}
            onChangeText={(t) => handleChange("name", t)}
            className="flex-1 ml-2 text-base"
            style={{ color: colors.text }}
          />
        </View>

        {/* Email */}
        <View
          className="flex-row items-center px-3 py-3 mb-4 rounded-xl"
          style={{ backgroundColor: colors.card }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color= {colors.text}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => handleChange("email", t)}
            className="flex-1 ml-2 text-base"
            style={{ color: colors.text }}
          />
        </View>

        {/* Password */}
        <View
          className="flex-row items-center px-3 py-3 mb-4 rounded-xl"
          style={{ backgroundColor: colors.card }}
        >
          <Ionicons name="key-outline" size={20} color= {colors.text} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(t) => handleChange("password", t)}
            className="flex-1 ml-2 text-base"
            style={{ color: colors.text }}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color= {colors.text}
            />
          </Pressable>
        </View>

        {/* Sign Up Button */}
        <Pressable
          onPress={handleSignUp}
          className="py-3 rounded-xl mt-2"
          style={{
            backgroundColor: colors.primary,
            alignItems: "center",
          }}
        >
          <Text className="text-white text-base font-semibold">Sign Up</Text>
        </Pressable>

        {/* Login Link */}
        <View className="flex-row justify-end mt-4">
            <Text className="text-sm mr-1" style={{color:colors.text}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("login")}>
            <Text className="text-sm font-semibold" style={{ color: colors.primary }}>Login?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
