import { colors } from "@/styles/colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
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
    color: colors.primary500,
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
    backgroundColor: colors.neutral100,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary100,
  },
  searchIcon: {
    color: colors.neutral500,
    fontSize: 18,
  },
  searchText: {
    color: colors.neutral400,
    fontSize: 15,
    marginLeft: 8,
  },
  flexSpacer: {
    flex: 1,
  },
})