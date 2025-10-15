import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Animated } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Expense() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [shimmer] = useState(new Animated.Value(0)); // no useRef here ✅

  const expenses = [
    { id: "1", title: "Food", date: "02 Mar, 2025", amount: 500, icon: "silverware-fork-knife" },
    { id: "2", title: "Logistics", date: "02 Mar, 2025", amount: 1400, icon: "truck-delivery-outline" },
    { id: "3", title: "Salary", date: "02 Mar, 2025", amount: 3290, icon: "cash-multiple" },
  ];

  // shimmer animation loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddPress = () => {
    alert("Add new expense clicked!");
  };

  // skeleton shimmer style
  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const SkeletonItem = () => (
    <Animated.View
      className="flex-row justify-between items-center p-4 mb-3 rounded-2xl"
      style={{ backgroundColor: colors.card, opacity: shimmerOpacity }}
    >
      <View className="flex-row items-center">
        <Animated.View
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
        />
        <View className="ml-3">
          <Animated.View
            className="w-24 h-4 mb-2 rounded"
            style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
          />
          <Animated.View
            className="w-16 h-3 rounded"
            style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
          />
        </View>
      </View>

      <Animated.View
        className="w-12 h-4 rounded"
        style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
      />
    </Animated.View>
  );

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      {loading ? (
        <>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className="flex-row justify-between items-center p-4 mb-3 rounded-2xl"
              style={{ backgroundColor: colors.card, elevation: 2 }}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons name={item.icon} size={24} color={colors.text} />
                <View className="ml-3">
                  <Text className="text-base font-semibold" style={{ color: colors.text }}>
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-sm">{item.date}</Text>
                </View>
              </View>

              <Text className="font-semibold text-base" style={{ color: "red" }}>
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}

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
