import { Stack } from "expo-router";

export default function LayoutAuth() {
    return (
        <Stack
            screenOptions={{ headerShown: false }}
        > 
            <Stack.Screen name="login" />
            <Stack.Screen name="recover" />
            <Stack.Screen name="register" />
        </Stack>
    )
}