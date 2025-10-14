import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Expense() {
  const { colors } = useTheme();

  const expenses = [
    {
      id: "1",
      title: "Food",
      date: "02 Mar, 2025",
      amount: 500,
      icon: "silverware-fork-knife",
      color: "red",
    },
    {
      id: "2",
      title: "Logistics",
      date: "02 Mar, 2025",
      amount: 1400,
      icon: "truck-delivery-outline",
      color: "red",
    },
    {
      id: "3",
      title: "Salary",
      date: "02 Mar, 2025",
      amount: 3290,
      icon: "cash-multiple",
      color: "red",
    },
  ];

  const handleAddPress = () => {
    alert("Add new expense clicked!");
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className="flex-row justify-between items-center p-4 mb-3 rounded-2xl"
            style={{ backgroundColor: colors.card, elevation: 2 }}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={colors.text}
              />
              <View className="ml-3">
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.text }}
                >
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-sm">{item.date}</Text>
              </View>
            </View>

            <Text
              className="font-semibold text-base"
              style={{ color: "red" }}
            >
              ${item.amount.toFixed(2)}
            </Text>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <Pressable
        onPress={handleAddPress}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.primary, elevation: 5 }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </Pressable>
    </View>
  );
}
