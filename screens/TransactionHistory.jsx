import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Alert, SafeAreaView } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { PDFDocument, Page, Text as PDFText, rgb } from "pdf-lib";
import GlobalDataTable from "components/GlobalDataTable";
import { Buffer } from "buffer";
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

  const handleDownloadStatement = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]);
      const { height } = page.getSize();

      // Title
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      page.drawText(`Account Statement ${dateStr}`, {
        x: 200,
        y: height - 50,
        size: 18,
        color: rgb(0, 0, 0),
      });

      // Table headers
      page.drawText("Name", { x: 50, y: height - 90, size: 12 });
      page.drawText("Type", { x: 200, y: height - 90, size: 12 });
      page.drawText("Amount", { x: 350, y: height - 90, size: 12 });
      page.drawText("Time", { x: 470, y: height - 90, size: 12 });

      let y = height - 110;
      transactions.forEach((t) => {
        page.drawText(t.name, { x: 50, y, size: 10 });
        page.drawText(t.type, { x: 200, y, size: 10 });
        page.drawText(t.amount, { x: 350, y, size: 10 });
        page.drawText(t.time, { x: 470, y, size: 10 });
        y -= 20;
      });

      const pdfBytes = await pdfDoc.save();
      const fileUri = FileSystem.documentDirectory + "Account_Statement.pdf";

      // Save PDF
      const base64Pdf = Buffer.from(pdfBytes).toString("base64");

      await FileSystem.writeAsStringAsync(fileUri, base64Pdf, {
        encoding: FileSystem.EncodingType.Base64,
      });


      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Saved!", `File saved to: ${fileUri}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to generate statement.");
    }
  };



  return (
    <SafeAreaView className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Download Button */}
        <Pressable
          onPress={handleDownloadStatement}
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
          title=""
          columns={columns}
          items={transactions}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
