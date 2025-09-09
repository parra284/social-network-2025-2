import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function LayoutMain() {
    const theme = useTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.primary500,
                tabBarInactiveTintColor: theme.neutral400,
                tabBarStyle: {
                    backgroundColor: theme.neutral50,
                    borderTopColor: theme.neutral200,
                    height: 60,
                    paddingTop: 10, // Added top padding
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="reels"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign name="fork" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="new-post"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[
                            styles.newPostButton,
                            {
                                backgroundColor: theme.primary500,
                                shadowColor: theme.primary500,
                                borderColor: theme.neutral200,
                            },
                        ]}>
                            <AntDesign name="plus" size={32} color={theme.neutral50} />
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="chat"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign name="message1" size={24} color={color} />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
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