import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Alert, SafeAreaView, ToastAndroid, Platform } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { PDFDocument, Page, Text as PDFText, rgb } from "pdf-lib";
import GlobalDataTable from "components/GlobalDataTable";
import { Buffer } from "buffer";
import { encode as btoa } from "base-64"; // ✅ Use base-64 package instead
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as FileSystem from "expo-file-system";
// import * as Toast from "react-native-toast-message"; // or use Alert if you don’t use Toast
// import { PDFDocument, rgb } from "pdf-lib";

export default function TransactionHistory() {
  const { colors } = useTheme();

  // Sample Data
  const [transactions] = useState([
    {
      name: "Usman",
      type: "On Time",
      amount: "$3,432.00",
      time: "03:20 PM",
      date: "13 Feb, 25 Monday",
    },
    {
      name: "Maaz",
      type: "On Time",
      amount: "$3,432.00",
      time: "03:20 PM",
      date: "13 Feb, 25 Monday",
    },
    {
      name: "Usman",
      type: "credit",
      amount: "$3,432.00",
      time: "03:20 PM",
      date: "13 Feb, 25 Monday",
    },
    {
      name: "Maaz",
      type: "On Time",
      amount: "$3,432.00",
      time: "03:20 PM",
      date: "13 Feb, 25 Monday",
    },
    {
      name: "Usman",
      type: "overdue",
      amount: "$3,432.00",
      time: "03:20 PM",
      date: "13 Feb, 25 Monday",
    },
  ]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
  ];

  // PDF Download Function
  const handleDownloadStatement = async (transactions) => {
    try {
      if (!transactions || !Array.isArray(transactions)) {
        showToast("No transaction data available!");
        return;
      }

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]);
      const { height } = page.getSize();

      // Add current date
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(now.getDate()).padStart(2, "0")}`;
      const fileName = `Account_Statement_${dateStr}.pdf`;

      page.drawText(`Account Statement (${dateStr})`, {
        x: 180,
        y: height - 50,
        size: 18,
        color: rgb(0, 0, 0),
      });

      // Table headers
      page.drawText("Name", { x: 50, y: height - 90, size: 12 });
      page.drawText("Type", { x: 200, y: height - 90, size: 12 });
      page.drawText("Amount", { x: 350, y: height - 90, size: 12 });
      page.drawText("Time", { x: 470, y: height - 90, size: 12 });

      // Table rows
      let y = height - 110;
      transactions.forEach((t) => {
        page.drawText(String(t.name || "-"), { x: 50, y, size: 10 });
        page.drawText(String(t.type || "-"), { x: 200, y, size: 10 });
        page.drawText(String(t.amount || "-"), { x: 350, y, size: 10 });
        page.drawText(String(t.time || "-"), { x: 470, y, size: 10 });
        y -= 20;
      });

      const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: false });

      if (Platform.OS === "android") {
        // ANDROID: use SAF and remember permission
        let savedDirUri = await AsyncStorage.getItem("downloadDirUri");

        if (!savedDirUri) {
          const permissions =
            await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (!permissions.granted) {
            showToast("Permission denied to save file");
            return;
          }

          savedDirUri = permissions.directoryUri;
          await AsyncStorage.setItem("downloadDirUri", savedDirUri);
          showToast("Storage permission saved!");
        }

        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          savedDirUri,
          fileName,
          "application/pdf"
        );

        await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        showToast("Statement downloaded successfully!");
        console.log("File saved at:", fileUri);
      } else {
        // iOS: save to app's documents folder
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        Alert.alert(
          "Downloaded",
          `Statement saved to app documents.\n\nPath: ${fileUri}`
        );
        console.log("iOS file saved at:", fileUri);
      }
    } catch (error) {
      console.error("Error generating statement:", error);
      showToast("Failed to generate statement!");
    }
  };

  function showToast(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }
  return (
    <SafeAreaView className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Download Button */}
        <Pressable
          onPress={() => handleDownloadStatement(transactions)}
          className="flex-row items-center justify-center py-3 rounded-xl mb-4"
          style={{ backgroundColor: colors.primary }}
        >
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text className="ml-2 text-white font-semibold text-base">
            Download Account Statement
          </Text>
        </Pressable>

        {/* Data Table */}
        <GlobalDataTable
          title="Transaction History"
          columns={columns}
          items={transactions}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
