import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'context/ThemeContext';

export default function CreateOrderScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const [customer, setCustomer] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = 10.0;
  const discount = 2.0;
  const orderId = route.params?.id || null;

  // Load order if editing
  useEffect(() => {
    if (orderId) {
      const fetched = {
        customer: 'John Doe',
        category: 'Fruits',
        cart: [{ id: 2, name: 'Papaya', qty: 3, unit: 'Bag', price: 24 }],
      };
      setCustomer(fetched.customer);
      setCategory(fetched.category);
      setCart(fetched.cart);
    }
  }, [orderId]);

  // Load mock items
  useEffect(() => {
    if (category) {
      setItems([
        { id: 1, name: 'Carrot', price: 45, unit: 'Bag' },
        { id: 2, name: 'Papaya', price: 24, unit: 'Bag' },
        { id: 3, name: 'Fish', price: 15, unit: 'Bag' },
        { id: 4, name: 'Tomato', price: 12, unit: 'Kg' },
        { id: 5, name: 'Apple', price: 30, unit: 'Kg' },
        { id: 6, name: 'Banana', price: 10, unit: 'Dozen' },
        { id: 7, name: 'Mango', price: 50, unit: 'Kg' },
        { id: 8, name: 'Onion', price: 20, unit: 'Kg' },
        { id: 9, name: 'Pineapple', price: 25, unit: 'Piece' },
      ]);
    } else {
      setItems([]);
    }
  }, [category]);

  // Recalculate subtotal when cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setSubtotal(total);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (!existing) return prev;
      if (existing.qty === 1) {
        return prev.filter((x) => x.id !== item.id);
      }
      return prev.map((x) =>
        x.id === item.id ? { ...x, qty: x.qty - 1 } : x
      );
    });
  };

  const handleSave = () => {
    if (!customer || !category) {
      ToastAndroid.show('Please select customer and category', ToastAndroid.SHORT);
      return;
    }

    const orderPayload = {
      id: orderId || Date.now(),
      customer,
      category,
      cart,
      subtotal,
      deliveryFee,
      discount,
      total: subtotal + deliveryFee - discount,
    };

    ToastAndroid.show(
      orderId ? 'Order updated successfully!' : 'Order created successfully!',
      ToastAndroid.SHORT
    );

    console.log('🧾 Order Data:', orderPayload);
  };

  const renderItem = useMemo(
    () =>
      ({ item }) => {
        const inCart = cart.find((x) => x.id === item.id);
        const quantity = inCart ? inCart.qty : 0;

        return (
          <View
            className="mb-2 flex-row items-center justify-between rounded-xl p-3"
            style={{ backgroundColor: colors.card }}
          >
            <View>
              <Text className="font-medium" style={{ color: colors.text }}>
                {item.name}
              </Text>
              <Text className="text-sm" style={{ color: colors.subtext }}>
                ${item.price}/{item.unit}
              </Text>
            </View>

            <View className="flex-row items-center">
              {quantity > 0 && (
                <TouchableOpacity onPress={() => removeFromCart(item)}>
                  <Ionicons name="remove-circle-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
              )}
              <Text className="mx-2 text-sm font-medium" style={{ color: colors.text }}>
                {quantity} {item.unit}
              </Text>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        );
      },
    [cart]
  );

  const headerComponent = (
    <View className="p-5">
      {/* Customer Picker */}
      <View className="mb-3 rounded-lg border" style={{ borderColor: colors.border }}>
        <Picker
          selectedValue={customer}
          onValueChange={(value) => setCustomer(value)}
          dropdownIconColor={colors.text}
          style={{ color: colors.text }}
        >
          <Picker.Item label="Select Customer" value="" />
          <Picker.Item label="John Doe" value="John Doe" />
          <Picker.Item label="Alice Smith" value="Alice Smith" />
        </Picker>
      </View>

      {/* Category Picker */}
      <View className="mb-3 rounded-lg border" style={{ borderColor: colors.border }}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          dropdownIconColor={colors.text}
          style={{ color: colors.text }}
        >
          <Picker.Item label="Category" value="" />
          <Picker.Item label="Fruits" value="Fruits" />
          <Picker.Item label="Vegetables" value="Vegetables" />
        </Picker>
      </View>
    </View>
  );

  const footerComponent = (
    <View className="p-5">
      <Text className="mb-2 text-base font-semibold" style={{ color: colors.text }}>
        Order Summary Preview
      </Text>

      {cart.map((item) => (
        <View key={item.id} className="mb-1 flex-row justify-between">
          <Text className="text-sm" style={{ color: colors.text }}>
            {item.qty} × {item.name}
          </Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            ${(item.price * item.qty).toFixed(2)}
          </Text>
        </View>
      ))}

      <View className="my-3 border-t" style={{ borderColor: colors.border }} />

      <View className="mb-5 space-y-2">
        <View className="flex-row justify-between">
          <Text className="text-sm" style={{ color: colors.subtext }}>Subtotal</Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm" style={{ color: colors.subtext }}>Delivery Fee</Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            ${deliveryFee.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm" style={{ color: colors.subtext }}>Discount</Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            ${discount.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between border-t pt-2" style={{ borderColor: colors.border }}>
          <Text className="text-base font-semibold" style={{ color: colors.text }}>
            Total (incl. GST)
          </Text>
          <Text className="text-base font-semibold" style={{ color: colors.text }}>
            ${(subtotal + deliveryFee - discount).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mt-3 flex-row">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-2 flex-1 items-center rounded-xl py-3"
          style={{ backgroundColor: '#E0E0E0' }}
        >
          <Text className="font-medium text-black">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          className="flex-1 items-center rounded-xl py-3"
          style={{ backgroundColor: colors.text }}
        >
          <Text className="font-medium text-white">{orderId ? 'Update' : 'Create'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={headerComponent}
      ListFooterComponent={footerComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: colors.background }}
    />
  );
}
