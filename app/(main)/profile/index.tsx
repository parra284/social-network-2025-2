import { useTheme } from "@/app/hooks/useTheme";
import { AuthContext } from '@/contexts/AuthContext';
import { Link } from "expo-router";
import React, { useContext, useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const theme = useTheme();

  const styles = useMemo(() =>
    StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 30,
        backgroundColor: theme.neutral50
      },
      topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      },
      info: {
        flex: 1,
        justifyContent: "center",
      },
      name: {
        fontSize: 22,
        fontWeight: "700",
        color: theme.neutral900,
      },
      user: {
        color: theme.neutral600,
        fontSize: 15
      },
      statsWrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 24,
      },
      statBox: {
        alignItems: "center",
      },
      statNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.primary500,
      },
      statLabel: {
        fontSize: 13,
        color: theme.neutral600,
      },
      section: { 
        width: "100%", 
        marginBottom: 30, 
      }, 
      sectionTitle: { 
        fontSize: 16, 
        fontWeight: "600", 
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
        justifyContent: "space-between",
        marginBottom: 20,
      },
      followButton: {
        flex: 1,
        backgroundColor: theme.primary500,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
        marginRight: 8,
      },
      followButtonText: {
        color: theme.neutral50,
        fontWeight: "700",
        fontSize: 15,
      },
      messageButton: {
        flex: 1,
        backgroundColor: theme.neutral100,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.primary200,
      },
      messageButtonText: {
        color: theme.primary500,
        fontWeight: "700",
        fontSize: 15,
      },
      avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: theme.primary400,
      },
      avatarWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        flex: 1
      }
    }), [theme]);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Row with name, username, stats */}
        <View style={styles.topRow}>
          <View style={styles.info}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.user}>@{user?.username || user?.email?.split('@')[0]}</Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsWrap}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Seguido por</Text> 
          <Text style={styles.followedBy}>@john, @alice, @bob y 10 más</Text> 
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Link
              href={"/(main)/profile/edit"}
              asChild
          >
              <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageButtonText}>Editar perfil</Text>
              </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar stays where you want it */}
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/44.jpg" }}
            style={styles.avatar}
          />
        </View>

      </ScrollView>
  );
}
