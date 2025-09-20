import Button from '@/components/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Row with name, username, stats */}
        <View style={styles.topRow}>
          <View style={styles.info}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.user}>@{user?.username}</Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsWrap}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user?.posts_count}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user?.followers_count}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user?.following_count}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}> 
           <Text style={styles.bio}>
              {user?.bio}
          </Text>
          <Text style={styles.sectionTitle}>Seguido por</Text> 
          <Text style={styles.followedBy}>@john, @alice, @bob y 10 más</Text> 
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button
            label='Edit profile'
            onPress={() => router.navigate('/profile/edit')}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 30,
    backgroundColor: colors.neutral50
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
    color: colors.neutral900,
  },
  user: {
    color: colors.neutral600,
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
    color: colors.primary500,
  },
  statLabel: {
    fontSize: 13,
    color: colors.neutral600,
  },
  section: { 
    width: "100%", 
    marginBottom: 30, 
  }, 
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: colors.neutral800, 
    marginBottom: 4, 
  }, 
  bio: {
    fontSize: 14,
    color: colors.neutral500,
    lineHeight: 20,
    marginBottom: 20
  },
  followedBy: { 
    color: colors.neutral500, 
    fontSize: 13, 
    marginLeft: 2, 
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: colors.primary400,
  },
  avatarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    flex: 1
  }
})
