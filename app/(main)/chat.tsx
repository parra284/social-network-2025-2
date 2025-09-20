import Header from "@/components/Header";
import { colors } from "@/styles/colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Chat() {
  return (
    <View style={styles.container}>
      {/* Header: Logo and App Name */}
      <Header 
        title="Chats"
      />
      <View style={styles.mainContent}>
        {/* Chat Space Example */}
        <View style={styles.chatSpaceContainer}>
          <Image
            source={require("../../assets/images/app_logo.png")}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.chatTextContainer}>
            <Text style={styles.chatName}>Juan Pérez</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
              ¡Hola! Este es el último mensaje recibido.
            </Text>
          </View>
        </View>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  chatSpaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    width: "100%",
    shadowColor: colors.primary900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary700,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.neutral700,
  },
})