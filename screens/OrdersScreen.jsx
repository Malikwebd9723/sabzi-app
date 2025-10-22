import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const ordersData = [
  {
    id: '1',
    orderId: '3450238475083',
    amount: '$125.43',
    customer: 'name or organization',
    items: 12,
    date: '13 July, 2025',
    status: 'Processed',
  },
  {
    id: '2',
    orderId: '3450238475094',
    amount: '$89.20',
    customer: 'Customer 2',
    items: 8,
    date: '13 July, 2025',
    status: 'Processed',
  },
  {
    id: '3',
    orderId: '3450238475105',
    amount: '$230.00',
    customer: 'Customer 3',
    items: 22,
    date: '13 July, 2025',
    status: 'Processed',
  },
];

export default function OrdersScreen() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('today');
  const navigation = useNavigation();
  const filteredOrders = selectedFilter === 'today' ? ordersData : [...ordersData, ...ordersData];

  const renderItem = ({ item }) => (
    <Pressable onPress={()=>navigation.navigate("createOrderScreen")} className="mb-3 rounded-2xl p-4 shadow-sm" style={{ backgroundColor: colors.card }}>
      {/* Header */}
      <View className="mb-1 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-md font-semibold" style={{ color: colors.text }}>
            ID:
          </Text>
          <Text className="text-sm" style={{ color: colors.subtext }}>
            {item.orderId}
          </Text>
        </View>
        <Text className="text-lg font-semibold" style={{ color: colors.text }}>
          {item.amount}
        </Text>
      </View>

      {/* Details */}
      <View className="mb-1 flex-row justify-between">
        <Text className="text-md" style={{ color: colors.text }}>
          Customer
        </Text>
        <Text className="mb-1 text-sm" style={{ color: colors.subtext }}>
          {item.customer}
        </Text>
      </View>

      <View className="mb-1 flex-row justify-between">
        <Text className="text-md" style={{ color: colors.text }}>
          Items
        </Text>
        <Text className="mb-1 text-sm" style={{ color: colors.subtext }}>
          {item.items}
        </Text>
      </View>

      <View className="mb-1 flex-row justify-between">
        <Text className="text-md" style={{ color: colors.text }}>
          Order Date
        </Text>
        <Text className="mb-1 text-sm" style={{ color: colors.subtext }}>
          {item.date}
        </Text>
      </View>
      <View className="mb-1 flex-row justify-between">
        <Text className="text-sm" style={{ color: colors.text }}>
          Status
        </Text>
        <Text className="text-sm font-semibold text-green-500">{item.status}</Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      {/* Dropdown Picker */}
      <View
        className="mb-4 overflow-hidden rounded-xl border"
        style={{ borderColor: colors.border, backgroundColor: colors.card }}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(value) => setSelectedFilter(value)}
          dropdownIconColor={colors.text}
          style={{ color: colors.text }}>
          <Picker.Item label="Today's Orders" value="today" />
          <Picker.Item label="All Orders" value="all" />
        </Picker>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <Pressable
        onPress={() => console.log('Add Order')}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full shadow-md"
        style={{ backgroundColor: colors.primary }}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}
