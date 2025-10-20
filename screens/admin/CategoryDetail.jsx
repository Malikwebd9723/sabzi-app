import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "context/ThemeContext";

const vegetablesData = [
  { id: "1", name: "Aloe Vera", purchase: "10.00", selling: "12.00", unit: "Bag", image: require("../../assets/aloe.jpg"), status: "green" },
  { id: "2", name: "Carrot", purchase: "5.00", selling: "6.50", unit: "Kg", image: require("../../assets/carrot.jpg"), status: "green" },
  { id: "3", name: "Potatoes", purchase: "3.00", selling: "4.00", unit: "Kg", image: require("../../assets/potato.jpg"), status: "green" },
  { id: "4", name: "Courgette", purchase: "6.00", selling: "7.50", unit: "Kg", image: require("../../assets/courgette.jpg"), status: "green" },
  { id: "5", name: "Ginger", purchase: "12.00", selling: "15.00", unit: "Kg", image: require("../../assets/ginger.jpg"), status: "green" },
  { id: "6", name: "Sugar Cane", purchase: "8.00", selling: "10.00", unit: "Stick", image: require("../../assets/sugarcane.jpg"), status: "green" },
  { id: "7", name: "Papaya", purchase: "14.00", selling: "17.00", unit: "Piece", image: require("../../assets/papaya.jpg"), status: "red" },
  { id: "8", name: "Other", purchase: "0.00", selling: "0.00", unit: "-", image: require("../../assets/others.jpg"), status: "gray" },
];

export default function CategoryDetail() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(vegetablesData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredData(vegetablesData);
    } else {
      const filtered = vegetablesData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const openModal = (item) => {
    setSelectedItem({ ...item });
    setModalVisible(true);
  };

  const handleUpdate = () => {
    ToastAndroid.show("Item updated successfully!", ToastAndroid.SHORT);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openModal(item)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        elevation: 2,
      }}
    >
      <Image
        source={item.image}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
          {item.name}
        </Text>
      </View>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor:
            item.status === "green"
              ? "#4CAF50"
              : item.status === "red"
              ? "#F44336"
              : "#9E9E9E",
        }}
      />
    </TouchableOpacity>
  );

  const inputStyle = {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: colors.text, // ✅ text color based on theme
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Image
          source={require("../../assets/vegetables.jpg")}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
            Vegetables
          </Text>
          <Text style={{ color: colors.subtext }}>
            {filteredData.length} Items
          </Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={22} style={{ color: colors.text }} />
      </View>

      {/* Search Bar */}
      <View
        className="flex-row items-center mb-4 rounded-full px-4 py-2"
        style={{ backgroundColor: colors.card }}
      >
        <Ionicons name="search" size={20} color={colors.text} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.subtext}
          value={searchText}
          onChangeText={handleSearch}
          className="flex-1 ml-2 text-base"
          style={{ color: colors.text }}
        />
        <Pressable
          onPress={() => ToastAndroid.show("Add item clicked", ToastAndroid.SHORT)}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 20,
              width: "90%",
              alignItems: "center",
            }}
          >
            {selectedItem && (
              <>
                <TouchableOpacity>
                  <Image
                    source={selectedItem.image}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      marginBottom: 10,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ color: colors.text, marginBottom: 15 }}>
                  Update Image
                </Text>

                <TextInput
                  style={inputStyle}
                  value={selectedItem.name}
                  onChangeText={(text) =>
                    setSelectedItem({ ...selectedItem, name: text })
                  }
                  placeholder="Name"
                  placeholderTextColor={colors.subtext}
                />

                <TextInput
                  style={inputStyle}
                  value={selectedItem.purchase}
                  onChangeText={(text) =>
                    setSelectedItem({ ...selectedItem, purchase: text })
                  }
                  placeholder="Purchase Price"
                  placeholderTextColor={colors.subtext}
                  keyboardType="numeric"
                />

                <TextInput
                  style={inputStyle}
                  value={selectedItem.selling}
                  onChangeText={(text) =>
                    setSelectedItem({ ...selectedItem, selling: text })
                  }
                  placeholder="Selling Price"
                  placeholderTextColor={colors.subtext}
                  keyboardType="numeric"
                />

                <TextInput
                  style={inputStyle}
                  value={selectedItem.unit}
                  onChangeText={(text) =>
                    setSelectedItem({ ...selectedItem, unit: text })
                  }
                  placeholder="Unit"
                  placeholderTextColor={colors.subtext}
                />

                {/* Dropdown for Status */}
                <View
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 10,
                    marginBottom: 20,
                    overflow: "hidden",
                  }}
                >
                  <Picker
                    selectedValue={selectedItem.status}
                    onValueChange={(value) =>
                      setSelectedItem({
                        ...selectedItem,
                        status: value,
                      })
                    }
                    style={{ color: colors.text }}
                  >
                    <Picker.Item label="In Stock" value="green" />
                    <Picker.Item label="Out of Stock" value="red" />
                  </Picker>
                </View>

                {/* Buttons */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: "#E0E0E0",
                      padding: 12,
                      borderRadius: 10,
                      flex: 1,
                      marginRight: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#000" }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                      backgroundColor: "#000814",
                      padding: 12,
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Update</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
