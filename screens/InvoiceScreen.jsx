import React from 'react';
import { View, Text, Pressable, ScrollView, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'context/ThemeContext';

export default function InvoiceScreen() {
  const { colors } = useTheme();

  const handleDownload = () => {
    ToastAndroid.show('Invoice Downloaded!', ToastAndroid.SHORT);
  };

  return (
    <ScrollView
      className="flex-1 p-5"
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}>
      {/* Success Icon */}
      <View className="my-4 items-center">
        <View
          className="mb-3 h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: '#E7F9EF' }}>
          <Ionicons name="checkmark" size={48} color="#1DB954" />
        </View>
        <Text className="mb-1 text-xl font-semibold" style={{ color: colors.text }}>
          Order # 3445456845
        </Text>
        <Text className="text-sm" style={{ color: colors.subtext }}>
          Delivered on 12 July 2025
        </Text>
      </View>

      {/* Address Section */}
      <View className="mb-5 flex-row items-start">
        <Ionicons
          name="location-outline"
          size={20}
          color={colors.text}
          style={{ marginRight: 8, marginTop: 2 }}
        />
        <View>
          <Text className="text-sm font-semibold" style={{ color: colors.text }}>
            Delivered to
          </Text>
          <Text className="text-sm" style={{ color: colors.subtext }}>
            complete address of customer
          </Text>
        </View>
      </View>

      {/* Items List */}
      {[1, 2, 3, 4].map((i) => (
        <View
          key={i}
          className="mb-2 flex-row justify-between"
          style={{ borderColor: colors.border }}>
          <Text className="text-sm" style={{ color: colors.text }}>
            2 bags Mangoes
          </Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            $24.00
          </Text>
        </View>
      ))}

      {/* Divider */}
      <View className="my-3 border-t" style={{ borderColor: colors.border }} />

      {/* Price Summary */}
      <View className="mb-5 space-y-2">
        <View className="flex-row justify-between">
          <Text className="text-md" style={{ color: colors.subtext }}>
            Subtotal
          </Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            $824.00
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-md" style={{ color: colors.subtext }}>
            Delivery Fee
          </Text>
          <Text className="text-md font-medium" style={{ color: colors.text }}>
            $10.00
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-md" style={{ color: colors.subtext }}>
            Discount
          </Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            $2.00
          </Text>
        </View>
        <View
          className="mt-2 flex-row justify-between border-t pt-2"
          style={{ borderColor: colors.border }}>
          <Text className="text-lg font-semibold" style={{ color: colors.text }}>
            Total (incl. GST)
          </Text>
          <Text className="text-lg font-semibold" style={{ color: colors.text }}>
            $832.00
          </Text>
        </View>
      </View>

      {/* Payment Section */}
      <View
        className="mb-4 flex-row items-center justify-between rounded-xl p-3"
        style={{ backgroundColor: colors.card }}>
        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={20} color={colors.text} />
          <Text className="ml-2 text-sm" style={{ color: colors.text }}>
            Cash on delivery COD
          </Text>
        </View>
        <Text className="font-medium" style={{ color: colors.text }}>
          $832.00
        </Text>
      </View>

      {/* Download Invoice */}
      <Pressable
        onPress={handleDownload}
        className="flex-row items-center justify-between rounded-xl p-3"
        style={{ backgroundColor: colors.card }}>
        <View className="flex-row items-center">
          <Ionicons name="document-text-outline" size={20} color={colors.text} />
          <Text className="ml-2 text-sm font-medium" style={{ color: colors.text }}>
            Download Invoice
          </Text>
        </View>
        <Ionicons name="share-social-outline" size={18} color={colors.text} />
      </Pressable>
    </ScrollView>
  );
}
