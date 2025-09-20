import Header from "@/components/Header";
import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Reels() {
  return (
    <View style={styles.container}>
      {/* Header: Logo and App Name */}
      <Header 
        title="Reels"
      />
      <View style={styles.mainContent}>
        <Text style={styles.placeholderText}>AQUI VA REELS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral50,
    paddingHorizontal: 0,
    paddingTop: 20,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 20,
    color: colors.neutral400,
    fontWeight: "600",
  },
})