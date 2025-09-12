import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function Chat() {
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
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
        chatSpaceContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.primary100,
          borderRadius: 12,
          padding: 12,
          marginTop: 12,
          width: "100%",
          shadowColor: theme.primary900,
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
          color: theme.primary700,
          marginBottom: 4,
        },
        lastMessage: {
          fontSize: 14,
          color: theme.neutral700,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      {/* Header: Logo and App Name */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
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