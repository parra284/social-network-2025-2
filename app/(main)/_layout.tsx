import { colors } from '@/styles/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from 'react-native';

export default function LayoutMain() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary500,
                tabBarInactiveTintColor: colors.neutral400,
                tabBarStyle: {
                    backgroundColor: colors.neutral50,
                    borderTopColor: colors.neutral200,
                    height: 60,
                    paddingTop: 10, // Added top padding
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="reels"
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="fork" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="new-post"
                options={{
                    tabBarIcon: () => (
                        <View style={[
                            styles.newPostButton,
                            {
                                backgroundColor: colors.primary500,
                                shadowColor: colors.primary500,
                                borderColor: colors.neutral200,
                            },
                        ]}>
                            <AntDesign name="plus" size={32} color={colors.neutral50} />
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="chat"
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="message" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    newPostButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'android' ? 30 : 20,
        borderWidth: 3,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
});