import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Pressable,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "context/ThemeContext";

const categoriesData = [
  { id: 1, name: "Vegetables", items: 20, image: require("../../assets/vegetables.jpg") },
  { id: 2, name: "Fruits", items: 20, image: require("../../assets/fruits.jpg") },
  { id: 3, name: "Herbs & Spices", items: 20, image: require("../../assets/herbs.jpg") },
  { id: 4, name: "Fish & Seafood", items: 20, image: require("../../assets/fish.jpg") },
  { id: 5, name: "Garlic & Onion", items: 20, image: require("../../assets/garlic.jpg") },
  { id: 6, name: "Packaged Goods", items: 20, image: require("../../assets/packed.jpg") },
  { id: 7, name: "Eggs & Dairy", items: 20, image: require("../../assets/eggs.jpg") },
  { id: 8, name: "Bread & Bakery", items: 20, image: require("../../assets/bakery.jpg") },
  { id: 9, name: "Others", items: 20, image: require("../../assets/others.jpg") },
];

export default function Categories() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(categoriesData);
  const [loading, setLoading] = useState(true);
  const shimmerValue = new Animated.Value(0);

  useEffect(() => {
    // Fake loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Start shimmer animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(shimmerValue, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredData(categoriesData);
    } else {
      setFilteredData(
        categoriesData.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      className="w-[30%] mx-auto my-3 items-center justify-center rounded-2xl p-3"
      style={{ backgroundColor: colors.card }}
      onPress={() => Alert.alert(item.name, `You have ${item.items} items in this category.`)}
    >
      <Image source={item.image} className="w-20 h-20 rounded-full mb-2" resizeMode="cover" />
      <Text className="font-semibold text-center" style={{ color: colors.text }}>
        {item.name}
      </Text>
      <Text className="text-sm text-gray-500">{item.items} items</Text>
    </Pressable>
  );

  const SkeletonItem = () => {
    const opacity = shimmerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    });

    return (
      <Animated.View
        className="w-[30%] m-2 items-center justify-center rounded-2xl p-3"
        style={{ backgroundColor: colors.card, opacity }}
      >
        <View className="w-20 h-20 rounded-full mb-2" style={{ backgroundColor: colors.background }} />
        <View className="w-16 h-3 mb-1 rounded" style={{ backgroundColor: colors.background }} />
        <View className="w-10 h-3 rounded" style={{ backgroundColor: colors.background }} />
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 p-2" style={{ backgroundColor: colors.background }}>
      {/* Search Bar */}
      <View
        className="flex-row items-center mb-4 rounded-full px-4 py-2"
        style={{ backgroundColor: colors.card }}
      >
        <Ionicons name="search" size={20} color={colors.text} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={handleSearch}
          className="flex-1 ml-2 text-base"
          style={{ color: colors.text }}
        />
        <Pressable
          onPress={() => {
            Alert.alert("Add Category", "Functionality to add a new category.");
          }}
        >
          <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>

      {/* Category Grid or Skeleton */}
      {loading ? (
        <FlatList
          data={Array(12).fill({})}
          renderItem={() => <SkeletonItem />}
          keyExtractor={(_, i) => i.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}
