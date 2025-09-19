import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Reels() {
  return (
    <View style={styles.container}>
      {/* Header: Logo and App Name */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reels</Text>
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: colors.primary500,
    letterSpacing: 0.5,
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