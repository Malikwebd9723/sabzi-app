import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "context/ThemeContext";
import { Button } from "react-native-paper";

export default function Dashboard() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Monthly");

  const users = [
    {
      id: 1,
      name: "Usman Ahmed",
      email: "user@email.com",
      org: "Org name",
      image: require("../../assets/user.jpg"),
    },
    {
      id: 2,
      name: "Maaz Khan",
      email: "user@email.com",
      org: "Org name",
      image: require("../../assets/user.jpg"),
    },
    {
      id: 3,
      name: "Test user",
      email: "user@email.com",
      org: "Org name",
      image: require("../../assets/user.jpg"),
      isNew: true,
    },
  ];

  const monthlySales = [
    { value: 40, label: 'Jan' },
    { value: 65, label: 'Mar' },
    { value: 50, label: 'May' },
    { value: 80, label: 'Jul' },
    { value: 90, label: 'Sep' },
    { value: 75, label: 'Nov' },
  ];
  const monthlyRevenue = [
    { value: 120, label: "Jan" },
    { value: 144, label: "Feb" },
    { value: 350, label: "Mar" },
    { value: 420, label: "Apr" },
    { value: 600, label: "May" },
    { value: 700, label: "Jun" },
    { value: 500, label: "Jul" },
    { value: 300, label: "Aug" },
    { value: 800, label: "Sep" },
    { value: 0, label: "Oct" },
    { value: 0, label: "Nov" },
    { value: 0, label: "Dec" },
  ];

  const progress = 84; // Example progress percentage
  const data = [
    { value: progress, color: colors.primary },
    { value: 100 - progress, color: colors.card },
  ];

  return (
    <ScrollView
      className="flex-1 px-4 pt-4"
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* TOTAL CARD */}
      <View
        className="rounded-2xl p-4 mb-4"
        style={{ backgroundColor: colors.card }}
      >
        <Text className="text-center text-gray-500">Total</Text>
        <Text
          className="text-center text-2xl font-semibold"
          style={{ color: colors.text }}
        >
          $188,458.00
        </Text>
      </View>

      {/* INCOME & EXPENSES */}
      <View className="flex-row justify-between mb-4">
        <View
          className="flex-1 mr-2 p-4 rounded-2xl"
          style={{ backgroundColor: colors.card }}
        >
          <Text className="text-center text-gray-500">Income</Text>
          <Text
            className="text-center font-semibold"
            style={{ color: colors.text }}
          >
            $167,456.00
          </Text>
        </View>

        <View
          className="flex-1 ml-2 p-4 rounded-2xl"
          style={{ backgroundColor: colors.card }}
        >
          <Text className="text-center text-gray-500">Expenses</Text>
          <Text
            className="text-center font-semibold text-red-500"
          >
            $9,328.00
          </Text>
        </View>
      </View>

      {/* STATISTICS */}
      <Text className="font-semibold text-lg mb-2" style={{ color: colors.text }}>
        Statistics
      </Text>

      {/* Tabs */}
      <View className="flex-row mb-3">
        {["Daily", "Weekly", "Monthly"].map((tab) => (
          <Button
            key={tab}
            mode={activeTab === tab ? "contained" : "outlined"}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              marginHorizontal: 4,
              borderRadius: 10,
              borderColor: colors.primary,
              backgroundColor: activeTab === tab ? colors.primary : colors.card,
            }}
            labelStyle={{ fontSize: 13, color: activeTab === tab ? '#fff' : colors.text }}
          >
            {tab}
          </Button>
        ))}
      </View>

      {/* Line Chart - Sales */}
      <View
        className="rounded-2xl p-4 mb-4"
        style={{ backgroundColor: colors.card }}
      >
        <Text className="font-semibold mb-2" style={{ color: colors.text }}>
          Sales
        </Text>
        <View className="flex-row justify-between mb-3">
          <Text style={{ color: colors.text }}>Orders completed: 11,496</Text>
          <Text style={{ color: colors.text }}>Total Sales: $33,570.00</Text>
        </View>

        <LineChart
          data={monthlySales}
          curved
          height={150}
          color={colors.primary}
          thickness={3}
          hideDataPoints={false}  // You can show small dots for clarity
          hideRules={false}       // Show horizontal grid lines
          backgroundColor={colors.card}
          yAxisTextStyle={{ color: colors.text }}
          xAxisLabelTextStyle={{ color: colors.text }}
          noOfSections={5}        // Increases Y-axis range divisions
          areaChart               // Optional: fill under the curve
          startFillColor={colors.primary}
          endFillColor="transparent"
          startOpacity={0.3}
          endOpacity={0.1}
        />
      </View>

      {/* Bar Chart - Revenue */}
      <View
        className="rounded-2xl p-4 mb-4"
        style={{ backgroundColor: colors.card }}
      >
        <Text className="font-semibold mb-2" style={{ color: colors.text }}>
          Revenue
        </Text>
        <Text style={{ color: colors.text, marginBottom: 5 }}>$5,425.00</Text>
        <BarChart
          data={monthlyRevenue}
          barWidth={22}
          frontColor={colors.primary}
          height={280}
          yAxisTextStyle={{ color: colors.text }}
          xAxisLabelTextStyle={{ color: colors.text }}
        />
      </View>

      {/* Newly Registered Customers */}
      <View
        className="rounded-2xl p-4 mb-4"
        style={{ backgroundColor: colors.card }}
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-semibold" style={{ color: colors.text }}>
            Newly Registered Customers
          </Text>
          <Ionicons name="people-outline" size={20} color={colors.text} />
        </View>
        <Text className="text-gray-400 text-sm mb-3">In last 30 days</Text>
        {users.map((user) => (
          <View
            key={user.id}
            className="flex-row justify-between items-center mb-3"
          >
            <View className="flex-row items-center">
              <Image
                source={user.image}
                className="w-10 h-10 rounded-full"
                resizeMode="cover"
              />
              <View className="ml-3">
                <Text style={{ color: colors.text, fontWeight: "600" }}>
                  {user.name}{" "}
                  {user.isNew && (
                    <Text className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary, color: '#fff' }}>
                      New
                    </Text>
                  )}
                </Text>
                <Text className="text-gray-500 text-sm">{user.email}</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-sm">{user.org}</Text>
          </View>
        ))}
      </View>

      {/* Yearly Sales Goal */}
      <View
        className="rounded-2xl p-4 mb-10"
        style={{ backgroundColor: colors.card }}
      >
        <Text className="font-semibold mb-4" style={{ color: colors.text }}>
          Yearly Sales Goal
        </Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <PieChart
            donut
            radius={70}
            animate={false}
            innerRadius={55}
            data={data}
            centerLabelComponent={() => (
              <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}>
                {progress}%
              </Text>
            )}
          />
          <Text style={{ color: colors.text, marginTop: 8 }}>Progress</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text style={{ color: colors.text }}>
            • Total Sales: $33,570.00
          </Text>
          <Text style={{ color: colors.text }}>• Target: $40,000.00</Text>
        </View>
      </View>
    </ScrollView>
  );
}
