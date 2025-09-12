import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
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
          paddingTop: 18,
          paddingBottom: 10,
          paddingHorizontal: 18,
        },
        logo: {
          width: 50,
          height: 50,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 4,
        },
        appName: {
          fontSize: 26,
          fontWeight: "500",
          color: theme.primary500,
          letterSpacing: 0.5,
        },
        mainContent: {
          flex: 1,
          paddingHorizontal: 18,
        },
        searchBarWrap: {
          width: "100%",
          marginBottom: 16,
        },
        searchBar: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.neutral100,
          borderRadius: 12,
          paddingHorizontal: 14,
          height: 40,
          borderWidth: 1,
          borderColor: theme.primary100,
        },
        searchIcon: {
          color: theme.neutral500,
          fontSize: 18,
        },
        searchText: {
          color: theme.neutral400,
          fontSize: 15,
          marginLeft: 8,
        },
        flexSpacer: {
          flex: 1,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      {/* Header: Logo and App Name */}
      <View style={styles.header}>
        <Image
            source={require("../../assets/images/app_logo.png")}
            style={styles.logo}
            resizeMode="contain"
        />
        <Text style={styles.appName}>Conexus</Text>
      </View>
      <View style={styles.mainContent}>
        {/* Search Bar */}
        <View style={styles.searchBarWrap}>
          <View style={styles.searchBar}>
            <Text style={styles.searchText}>Buscar en Conexus</Text>
          </View>
        </View>

        {/* Whitespace for future functionality */}
        <View style={styles.flexSpacer} />
      </View>
    </View>
  );
}