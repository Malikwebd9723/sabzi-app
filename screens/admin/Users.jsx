import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import { useTheme } from "context/ThemeContext";

export default function Users() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // no useRef ✅

  useEffect(() => {
    // shimmer effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // simulate 2s data loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const shimmerOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  // Dummy user data
  const [users] = useState([
    { id: 1, name: "Usman Ahmed", email: "user@email.com", org: "Org name", image: require("../../assets/user.jpg"), createdAt: new Date("2025-10-10") },
    { id: 2, name: "Maaz Khan", email: "user@email.com", org: "Org name", image: require("../../assets/user.jpg"), createdAt: new Date("2025-10-01") },
    { id: 3, name: "Ali Raza", email: "user@email.com", org: "Org name", image: require("../../assets/user.jpg"), createdAt: new Date("2025-10-11") },
    { id: 4, name: "Sara Malik", email: "user@email.com", org: "Org name", image: require("../../assets/user.jpg"), createdAt: new Date("2025-09-28") },
    { id: 5, name: "Hassan Iqbal", email: "user@email.com", org: "Org name", image: require("../../assets/user.jpg"), createdAt: new Date("2025-10-12") },
  ]);

  // check if user joined ≤ 3 days ago
  const isNewUser = (date) => {
    const today = new Date();
    const diff = (today - date) / (1000 * 60 * 60 * 24);
    return diff <= 3;
  };

  // filter + search
  const filteredUsers = useMemo(() => {
    let data = users;
    if (activeFilter === "new") data = data.filter((user) => isNewUser(user.createdAt));
    if (searchQuery) data = data.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return data;
  }, [searchQuery, activeFilter, users]);

  const handleAddUser = () => {
    Alert.alert("Add User", "Add user button clicked!");
  };

  // Animated skeleton loader
  const renderSkeleton = () => (
    <View>
      {[...Array(4)].map((_, i) => (
        <Animated.View
          key={i}
          className="flex-row items-center justify-between p-3 mb-2 rounded-2xl"
          style={{ backgroundColor: colors.card, opacity: shimmerOpacity }}
        >
          <View className="flex-row items-center">
            <Animated.View
              className="w-10 h-10 rounded-full mr-3"
              style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
            />
            <View>
              <Animated.View
                className="w-28 h-4 mb-2 rounded"
                style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
              />
              <Animated.View
                className="w-20 h-3 rounded"
                style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
              />
            </View>
          </View>
          <Animated.View
            className="w-16 h-3 rounded"
            style={{ backgroundColor: colors.border, opacity: shimmerOpacity }}
          />
        </Animated.View>
      ))}
    </View>
  );

  return (
    <View className="flex-1 px-2 pt-2" style={{ backgroundColor: colors.background }}>
      {/* Search & Add Button */}
      <View
        className="flex-row items-center mb-4 rounded-full px-4 py-2"
        style={{ backgroundColor: colors.card }}
      >
        <Ionicons name="search" size={20} color={colors.text} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 ml-2 text-base"
          style={{ color: colors.text }}
        />

        <Pressable
          onPress={() => {
            Alert.alert("Add User", "Functionality to add a new user.");
          }}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Filter Chips */}
      <View className="flex-row mb-4 space-x-2">
        <Chip
          selected={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
          style={{ backgroundColor: colors.card, marginRight: 8 }}
          textStyle={{
            color: colors.text,
            fontWeight: "600",
          }}
        >
          All Users
        </Chip>
        <Chip
          selected={activeFilter === "new"}
          onPress={() => setActiveFilter("new")}
          style={{ backgroundColor: colors.card }}
          textStyle={{
            color: colors.text,
            fontWeight: "600",
          }}
        >
          Newly Registered
        </Chip>
      </View>

      {/* Main List */}
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text className="text-center mt-10 text-gray-500" style={{ color: colors.text }}>
              No users found
            </Text>
          }
          renderItem={({ item }) => (
            <View
              className="flex-row items-center justify-between p-3 mb-2 rounded-2xl"
              style={{ backgroundColor: colors.card }}
            >
              <View className="flex-row items-center">
                <Image source={item.image} className="w-10 h-10 rounded-full" resizeMode="cover" />
                <View className="ml-3">
                  <View className="flex-row items-center">
                    <Text className="font-semibold text-base" style={{ color: colors.text }}>
                      {item.name}
                    </Text>
                    {isNewUser(item.createdAt) && (
                      <Text
                        className="ml-2 text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: colors.primary, color: "#fff" }}
                      >
                        New
                      </Text>
                    )}
                  </View>
                  <Text className="text-sm text-gray-500">{item.email}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-400">{item.org}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
