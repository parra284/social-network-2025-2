import React, { useMemo } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function Reels() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.neutral50,
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
          color: theme.primary500,
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
          color: theme.neutral400,
          fontWeight: "600",
        },
      }),
    [colorScheme, theme]
  );

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