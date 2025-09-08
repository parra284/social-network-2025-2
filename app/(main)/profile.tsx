import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import { COLORS } from "../constants/colors";

export default function Profile() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? COLORS.dark : COLORS.light ;

  const styles = useMemo(() => StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,  
      alignItems: "center",
      paddingTop: 44,
      paddingBottom: 32,
      paddingHorizontal: 24,
    },
    name: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.neutral900,
      letterSpacing: 1,
    },
    user: {
        color: theme.neutral600, 
        fontSize: 15, 
        marginBottom: 18
    },
    statsWrap: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18
    },
    statBox: {
      alignItems: "center",
      marginHorizontal: 10,
    },
    statNumber: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.primary500,
    },
    statLabel: {
      fontSize: 13,
      color: theme.neutral600,
    },
    section: {
      width: "100%",
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.neutral800,
      marginBottom: 4,
    },
    followedBy: {
      color: theme.neutral500,
      fontSize: 13,
      marginLeft: 2,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 12,
      marginBottom: 18,
    },
    followButton: {
      backgroundColor: theme.primary500,
      borderRadius: 12,
      paddingHorizontal: 32,
      paddingVertical: 8,
      marginRight: 12,
      shadowColor: theme.primary300,
      shadowOpacity: 0.18,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    followButtonText: {
      color: theme.neutral50,
      fontWeight: "700",
      fontSize: 15,
      letterSpacing: 0.5,
    },
    messageButton: {
      backgroundColor: theme.neutral100,
      borderRadius: 12,
      paddingHorizontal: 28,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: theme.primary200,
    },
    messageButtonText: {
      color: theme.primary500,
      fontWeight: "700",
      fontSize: 15,
      letterSpacing: 0.5,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginRight: 24,
      borderWidth: 3,
      borderColor: theme.primary400,
    },
  }), [colorScheme, theme]);

  return (
    <LinearGradient
      colors={[theme.primary50, theme.primary200, theme.primary400]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Name and username at the top */}
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.user}>@janedoe</Text>
        {/* Stats */}
        <View style={styles.statsWrap}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Ideas</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        {/* Followed by */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguido por</Text>
          <Text style={styles.followedBy}>@john, @alice, @bob y 10 más</Text>
        </View>
        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Seguir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Mensaje</Text>
          </TouchableOpacity>
        </View>
        {/* User image centered in the rest of the space */}
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginTop: 30 }}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.avatar}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}