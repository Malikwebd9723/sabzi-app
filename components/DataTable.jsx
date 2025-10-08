import { useTheme } from "context/ThemeContext";
import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function DataTable({ title, columns, data }) {
  const { colors } = useTheme();

  // Helper to get cell style (dynamic based on column key or value)
  const getCellStyle = (key, value) => {
    if (key === "pending" && value > 10) {
      return { color: colors.error || "#E53935", fontWeight: "600" }; // red for high pending
    }
    if (key === "picked" && value > 0) {
      return { color: colors.success || "#43A047", fontWeight: "600" }; // green for picked
    }
    if (key === "total") {
      return { color: colors.textSecondary || colors.text, opacity: 0.9 };
    }
    return { color: colors.text };
  };

  return (
    <View
      className="rounded-2xl p-4 my-1 shadow-md"
      style={{ backgroundColor: colors.card }}
    >
      {/* Header Section */}
      <View className="mb-3 flex-row justify-between">
        <Text className="font-bold text-lg" style={{ color: colors.text }}>
          {title}
        </Text>
        <Text className="text-gray-500" style={{ color: colors.text }}>
          {data.length} total items
        </Text>
      </View>

      {/* Table Header */}
      <View
        className="flex-row border-b pb-2 px-1"
        style={{ borderColor: colors.border }}
      >
        {columns.map((col) => (
          <Text
            key={col.key}
            className="flex-1 text-sm font-semibold"
            style={{ color: colors.text }}
          >
            {col.label}
          </Text>
        ))}
      </View>

      {/* Table Rows */}
      <ScrollView className="mt-2">
        {data.map((item, i) => (
          <View
            key={i}
            className="flex-row py-2 px-1"
            style={{
              backgroundColor: i % 2 ? colors.grey : colors.card,
              borderColor: colors.border,
            }}
          >
            {columns.map((col) => (
              <Text
                key={col.key}
                className="flex-1 text-md"
                style={getCellStyle(col.key, item[col.key])}
              >
                {item[col.key]}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
